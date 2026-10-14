/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TreeNode {
  id: string;
  name: string;
  type: 'MAX' | 'MIN' | 'LEAF';
  value?: number;
  alpha?: number;
  beta?: number;
  isPruned?: boolean;
  children?: TreeNode[];
}

export interface TreeStep {
  step: number;
  activeNodeId: string;
  action: 'visit' | 'evaluate' | 'update_alpha' | 'update_beta' | 'prune' | 'return';
  alpha: number;
  beta: number;
  currentValue?: number;
  description: string;
  prunedNodeIds?: string[];
  treeSnapshot: TreeNode;
}

// Syllabus Pre-set Tree from Unit 2 Part B Q2: Alpha-Beta Pruning
export function getSyllabusAlphaBetaTree(): TreeNode {
  return {
    id: 'A',
    name: 'Root A',
    type: 'MAX',
    children: [
      {
        id: 'B',
        name: 'Node B',
        type: 'MIN',
        children: [
          {
            id: 'D',
            name: 'Node D',
            type: 'MAX',
            children: [
              { id: 'D1', name: 'Leaf 2', type: 'LEAF', value: 2 },
              { id: 'D2', name: 'Leaf 3', type: 'LEAF', value: 3 }
            ]
          },
          {
            id: 'E',
            name: 'Node E',
            type: 'MAX',
            children: [
              { id: 'E1', name: 'Leaf 5', type: 'LEAF', value: 5 },
              { id: 'E2', name: 'Leaf 9', type: 'LEAF', value: 9 }
            ]
          }
        ]
      },
      {
        id: 'C',
        name: 'Node C',
        type: 'MIN',
        children: [
          {
            id: 'F',
            name: 'Node F',
            type: 'MAX',
            children: [
              { id: 'F1', name: 'Leaf 0', type: 'LEAF', value: 0 },
              { id: 'F2', name: 'Leaf 1', type: 'LEAF', value: 1 }
            ]
          },
          {
            id: 'G',
            name: 'Subtree G',
            type: 'MAX',
            children: [
              { id: 'G1', name: 'Leaf 7', type: 'LEAF', value: 7 },
              { id: 'G2', name: 'Leaf 5', type: 'LEAF', value: 5 }
            ]
          }
        ]
      }
    ]
  };
}

export function traceAlphaBeta(
  root: TreeNode,
  usePruning: boolean
): TreeStep[] {
  const steps: TreeStep[] = [];
  let stepCounter = 1;

  function deepClone(node: TreeNode): TreeNode {
    return JSON.parse(JSON.stringify(node));
  }

  function markPruned(node: TreeNode, prunedList: string[]) {
    node.isPruned = true;
    prunedList.push(node.id);
    if (node.children) {
      node.children.forEach(child => markPruned(child, prunedList));
    }
  }

  function alphaBeta(
    node: TreeNode,
    alpha: number,
    beta: number,
    isMaximizing: boolean
  ): number {
    node.alpha = alpha;
    node.beta = beta;

    steps.push({
      step: stepCounter++,
      activeNodeId: node.id,
      action: 'visit',
      alpha,
      beta,
      description: `Visiting ${node.name} (${node.type}). Current [α=${alpha === -Infinity ? '-∞' : alpha}, β=${beta === Infinity ? '+∞' : beta}].`,
      treeSnapshot: deepClone(root)
    });

    if (node.type === 'LEAF' || !node.children || node.children.length === 0) {
      steps.push({
        step: stepCounter++,
        activeNodeId: node.id,
        action: 'evaluate',
        alpha,
        beta,
        currentValue: node.value,
        description: `Terminal Leaf ${node.name} evaluated. Payoff utility = ${node.value}.`,
        treeSnapshot: deepClone(root)
      });
      return node.value!;
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const evalVal = alphaBeta(child, alpha, beta, false);
        maxEval = Math.max(maxEval, evalVal);
        node.value = maxEval;

        const prevAlpha = alpha;
        alpha = Math.max(alpha, evalVal);
        node.alpha = alpha;

        steps.push({
          step: stepCounter++,
          activeNodeId: node.id,
          action: 'update_alpha',
          alpha,
          beta,
          currentValue: maxEval,
          description: `MAX Node ${node.name} updated with child ${child.name} result (${evalVal}). Best value = ${maxEval}. α updated from ${prevAlpha === -Infinity ? '-∞' : prevAlpha} to ${alpha}.`,
          treeSnapshot: deepClone(root)
        });

        if (usePruning && beta <= alpha) {
          const prunedIds: string[] = [];
          for (let j = i + 1; j < node.children.length; j++) {
            markPruned(node.children[j], prunedIds);
          }
          steps.push({
            step: stepCounter++,
            activeNodeId: node.id,
            action: 'prune',
            alpha,
            beta,
            currentValue: maxEval,
            prunedNodeIds: prunedIds,
            description: `PRUNING OCCURRED! Condition satisfied: α (${alpha}) ≥ β (${beta}). Sibling nodes [${prunedIds.join(', ')}] PRUNED!`,
            treeSnapshot: deepClone(root)
          });
          break;
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const evalVal = alphaBeta(child, alpha, beta, true);
        minEval = Math.min(minEval, evalVal);
        node.value = minEval;

        const prevBeta = beta;
        beta = Math.min(beta, evalVal);
        node.beta = beta;

        steps.push({
          step: stepCounter++,
          activeNodeId: node.id,
          action: 'update_beta',
          alpha,
          beta,
          currentValue: minEval,
          description: `MIN Node ${node.name} updated with child ${child.name} result (${evalVal}). Best value = ${minEval}. β updated from ${prevBeta === Infinity ? '+∞' : prevBeta} to ${beta}.`,
          treeSnapshot: deepClone(root)
        });

        if (usePruning && beta <= alpha) {
          const prunedIds: string[] = [];
          for (let j = i + 1; j < node.children.length; j++) {
            markPruned(node.children[j], prunedIds);
          }
          steps.push({
            step: stepCounter++,
            activeNodeId: node.id,
            action: 'prune',
            alpha,
            beta,
            currentValue: minEval,
            prunedNodeIds: prunedIds,
            description: `PRUNING OCCURRED! Condition satisfied: β (${beta}) ≤ α (${alpha}). Sibling branch [${prunedIds.join(', ')}] PRUNED!`,
            treeSnapshot: deepClone(root)
          });
          break;
        }
      }
      return minEval;
    }
  }

  alphaBeta(root, -Infinity, Infinity, root.type === 'MAX');
  return steps;
}
