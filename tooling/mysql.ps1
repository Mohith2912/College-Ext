param([ValidateSet('setup','start','stop')][string]$Action='start', [string]$MySqlHome='C:\Program Files\MySQL\MySQL Server 8.4')
$ErrorActionPreference='Stop'
$projectRoot=Split-Path $PSScriptRoot -Parent
$localDir=Join-Path $projectRoot '.local'
$dataDir=Join-Path $localDir 'mysql-data'
$configFile=Join-Path $localDir 'mysql.ini'
$adminConfig=Join-Path $localDir 'mysql-admin.cnf'
$server=Join-Path $MySqlHome 'bin\mysqld.exe'
$client=Join-Path $MySqlHome 'bin\mysql.exe'
$admin=Join-Path $MySqlHome 'bin\mysqladmin.exe'
if(!(Test-Path -LiteralPath $server)){throw "MySQL 8.4 is required. Install MySQL or pass -MySqlHome with its directory."}
if($Action -eq 'stop'){
  if(!(Test-Path -LiteralPath $adminConfig)){throw 'Run database setup first.'}
  & $admin "--defaults-extra-file=$adminConfig" shutdown
  if($LASTEXITCODE -ne 0){throw 'MySQL shutdown failed.'}
  exit
}
New-Item -ItemType Directory -Path $localDir -Force | Out-Null
if(!(Test-Path -LiteralPath $configFile)){
  $baseSql=$MySqlHome.Replace('\','/')
  $dataSql=$dataDir.Replace('\','/')
  @"
[mysqld]
basedir=$baseSql
datadir=$dataSql
port=3307
bind-address=127.0.0.1
mysqlx=0
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
max_connections=60
log-error=$($localDir.Replace('\','/'))/mysql-error.log
"@ | Set-Content -LiteralPath $configFile -Encoding ascii
}
if(!(Test-Path -LiteralPath (Join-Path $dataDir 'mysql'))){
  if($Action -ne 'setup'){throw 'Run pnpm db:setup first.'}
  & $server "--defaults-file=$configFile" --initialize-insecure
  if($LASTEXITCODE -ne 0){throw 'MySQL initialization failed. See .local/mysql-error.log.'}
}
function Test-DatabaseRunning {
  $connection=New-Object System.Net.Sockets.TcpClient
  try {$connection.Connect('127.0.0.1',3307); return $true} catch {return $false} finally {$connection.Dispose()}
}
if(!(Test-DatabaseRunning)){
  Start-Process -FilePath $server -ArgumentList "--defaults-file=`"$configFile`"" -WindowStyle Hidden
  for($i=0;$i -lt 60;$i++){if(Test-DatabaseRunning){break}; Start-Sleep -Milliseconds 500}
  if(!(Test-DatabaseRunning)){throw 'MySQL did not start. See .local/mysql-error.log.'}
}
if($Action -eq 'setup' -and !(Test-Path -LiteralPath $adminConfig)){
  function New-RandomSecret { $bytes=New-Object byte[] 32; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes); return ([BitConverter]::ToString($bytes)).Replace('-','').ToLower() }
  $databasePassword=New-RandomSecret
  $rootPassword=New-RandomSecret
  $authSecret=New-RandomSecret
  $sql=@"
CREATE DATABASE IF NOT EXISTS aetheria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS aetheria_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'aetheria'@'127.0.0.1' IDENTIFIED BY '$databasePassword';
GRANT ALL PRIVILEGES ON aetheria.* TO 'aetheria'@'127.0.0.1';
GRANT ALL PRIVILEGES ON aetheria_test.* TO 'aetheria'@'127.0.0.1';
ALTER USER 'root'@'localhost' IDENTIFIED BY '$rootPassword';
"@
  $sql | & $client --protocol=TCP --host=127.0.0.1 --port=3307 --user=root
  if($LASTEXITCODE -ne 0){throw 'Database bootstrap failed.'}
  "[client]`nhost=127.0.0.1`nport=3307`nuser=root`npassword=$rootPassword`nprotocol=TCP" | Set-Content -LiteralPath $adminConfig -Encoding ascii
  $envText=@"
DATABASE_URL="mysql://aetheria:$databasePassword@127.0.0.1:3307/aetheria"
AUTH_SECRET="$authSecret"
USERS_URL="http://localhost:3000"
ORGANIZATION_SLUG="aetheria"
SMTP_HOST="127.0.0.1"
SMTP_PORT="1025"
SMTP_FROM="Aetheria <noreply@aetheria.local>"
AI_BASE_URL="https://api.openai.com/v1"
AI_API_KEY=""
AI_MODEL=""
"@
  $envPath=Join-Path $projectRoot '.env'
  if(Test-Path -LiteralPath $envPath){$envText | Set-Content -LiteralPath (Join-Path $localDir 'generated.env') -Encoding ascii; Write-Output 'Existing .env preserved; generated local settings are in .local/generated.env.'} else {$envText | Set-Content -LiteralPath $envPath -Encoding ascii}
  $envText.Replace('/aetheria"','/aetheria_test"') | Set-Content -LiteralPath (Join-Path $projectRoot '.env.test') -Encoding ascii
  Write-Output 'Created separate development and test databases. Random credentials are stored in ignored local files.'
}
Write-Output 'Native MySQL is running on 127.0.0.1:3307.'
