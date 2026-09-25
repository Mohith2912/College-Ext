import { expect,test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('public library, note reader, cases, and responsive layout work',async({page})=>{await page.goto('/notes');await expect(page.getByRole('heading',{name:'Your course notes, thoughtfully organized.'})).toBeVisible();await expect(page.locator('.course-card')).toHaveCount(12);const first=page.locator('.course-card').first();await expect(first).toBeVisible();await first.click();await expect(page.getByRole('heading',{name:'Course syllabus'})).toBeVisible();await page.locator('.module-row').first().click();await expect(page.locator('#note-content')).toBeVisible();await page.goto('/case-studies');await expect(page.getByRole('heading',{name:'Original case studies.'})).toBeVisible();await expect(page.locator('.case-card').first()).toBeVisible();const width=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));expect(width.scroll).toBeLessThanOrEqual(width.client+1);const violations=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();expect(violations.violations).toEqual([])});

test('semester podcasts and interactive sessions use published course content',async({page})=>{await page.goto('/podcasts');await expect(page.getByRole('heading',{name:'Course conversations.'})).toBeVisible();await expect(page.getByText('A conversation between Mira and Arun')).toBeVisible();await expect(page.locator('.dialogue-transcript button')).toHaveCount(12);await page.getByRole('tab',{name:'Term 2'}).click();await expect(page.locator('.episode-list button').first()).toBeVisible();await page.goto('/interactive?course=computer-networks&module=computer-networks-unit-2');await expect(page.getByRole('heading',{name:'Interactive study lab.'})).toBeVisible();await expect(page.getByText(/Step 1 of/)).toBeVisible();await expect(page.locator('.active-concept strong')).toHaveText('Computer Networks · Unit 2 Network Design Lab');await page.getByRole('button',{name:'Show guidance'}).click();await expect(page.getByText('Explore the source idea')).toBeVisible();await page.getByRole('button',{name:/Next/}).click();await expect(page.getByText(/Step 2 of/)).toBeVisible();const width=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));expect(width.scroll).toBeLessThanOrEqual(width.client+1)});

test('Computer Networks Unit 2 integrates the full responsive network lab',async({page})=>{
  await page.goto('/notes/computer-networks/computer-networks-unit-2');
  await expect(page.getByRole('heading',{name:'How Amazon Delivers Your Order From Phone to Door'})).toBeVisible();
  await page.getByRole('button',{name:'Launch Pipeline'}).click();
  await expect(page.getByRole('heading',{name:/Step 1 of 8/})).toBeVisible();
  await page.getByRole('button',{name:/Next Step/}).click();
  await expect(page.getByRole('heading',{name:/Step 2 of 8/})).toBeVisible();
  await page.getByRole('button',{name:/Subnetting/}).click();
  await expect(page.getByRole('heading',{name:'IPv4 Subnetting, CIDR & VLSM Explorer'})).toBeVisible();
  await page.getByRole('button',{name:/Home Wi-Fi/}).click();
  await expect(page.getByText('192.168.10.64')).toBeVisible();
  await page.getByRole('button',{name:'NAT / PAT'}).click();
  await expect(page.getByRole('heading',{name:/Dynamic NAT & PAT/})).toBeVisible();
  await page.getByRole('button',{name:/\+ iPad Order Packet/}).click();
  await expect(page.getByText(/198\.51\.100\.4:/).first()).toBeVisible();
  await page.getByRole('button',{name:/OSPF & BGP|Routing Sandbox/}).click();
  await expect(page.getByRole('heading',{name:/OSPF \(Interior\) vs\. BGP/})).toBeVisible();
  await page.getByRole('button',{name:'Link Active (Primary)'}).click();
  await expect(page.getByText(/FAILURE/).first()).toBeVisible();
  await page.getByRole('button',{name:/Encapsulation/}).click();
  await expect(page.getByRole('heading',{name:/Wireshark Encapsulation Inspector/})).toBeVisible();
  await page.getByRole('button',{name:/Matrix/}).click();
  await expect(page.getByRole('table').first()).toBeVisible();
  await page.getByRole('button',{name:/Diagnostic Lab/}).click();
  await expect(page.getByRole('heading',{name:/Diagnostic Lab/})).toBeVisible();
  await page.getByRole('button',{name:/Checks/}).click();
  await expect(page.getByRole('heading',{name:/Scenario-Grounded/})).toBeVisible();
  const width=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  expect(width.scroll).toBeLessThanOrEqual(width.client+1);
});

test('Computer Networks Unit 1 integrates the complete interactive reference module',async({page})=>{
  await page.goto('/notes/computer-networks/computer-networks-unit-1');
  await expect(page.getByRole('heading',{name:'What Actually Happens When You Open Netflix?'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'The End-to-End Transit Path'})).toBeVisible();
  await page.locator('#transit-simulator').scrollIntoViewIfNeeded();
  await page.getByRole('button',{name:'Auto Play'}).click();
  await expect(page.getByRole('button',{name:'Pause'})).toBeVisible();
  await page.getByRole('button',{name:'Pause'}).click();
  await page.getByTitle('Next Hop').click();
  await expect(page.getByText(/Hop 2 of 7/)).toBeVisible();
  await page.getByRole('button',{name:/Hardware & Topologies|Router, Switch & Gateway/}).click();
  await page.locator('#hardware').scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading',{name:'Network Topology & Resilience'})).toBeVisible();
  await page.getByRole('button',{name:'BUS'}).evaluate((button:HTMLButtonElement)=>button.click());
  await expect(page.getByText('Shared Coaxial Bus Cable')).toBeVisible();
  await page.getByRole('button',{name:/Signals|Signal Encoding/}).click();
  const bitInput=page.locator('input[type="text"]').first();
  await bitInput.fill('11001010');
  await expect(bitInput).toHaveValue('11001010');
  await page.getByRole('button',{name:/Diagnostic/}).click();
  await page.getByRole('button',{name:/Case D: Layer 4/}).evaluate((button:HTMLButtonElement)=>button.click());
  await expect(page.getByText(/firewall is silently dropping TCP SYN packets/)).toBeVisible();
  const width=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  expect(width.scroll).toBeLessThanOrEqual(width.client+1);
});
