export const knowledgeBase = [
  {
    id: "k001",
    topic: "Two Pointers",
    content: `Two Pointers uses two indices traversing an array or list simultaneously, reducing O(n²) brute force to O(n).

Types:
1. Opposite ends: left=0, right=n-1, converge toward middle (sorted array problems)
2. Fast/Slow: cycle detection, find middle of linked list (Floyd's algorithm)
3. Same direction: for partitioning or overwriting in-place

When to use: pair sum in sorted array, remove duplicates in-place, palindrome check, cycle detection, trapping rain water.

Template - Opposite Ends:
function twoSum(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    sum < target ? left++ : right--;
  }
  return [];
}
// Time: O(n), Space: O(1)

Template - Fast/Slow (Cycle Detection):
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

Finding middle of linked list:
function findMiddle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow; // at middle when fast reaches end
}

3Sum (fix one, two pointers on rest):
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue; // skip duplicates
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left+1]) left++;
        while (left < right && nums[right] === nums[right-1]) right--;
        left++; right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return result;
}

LeetCode: #11, #15, #26, #42, #141, #142, #167, #344, #876`
  },
  {
    id: "k002",
    topic: "Sliding Window",
    content: `Sliding Window maintains a contiguous subarray/substring window that expands or contracts to find an optimal answer in O(n).

Types:
1. Fixed size: window always has k elements
2. Dynamic: window shrinks when a constraint is violated

When to use: max/min subarray sum of size k, longest substring without repeat, min window substring, count subarrays with condition.

Fixed Window - Max Sum Subarray of K:
function maxSumSubarray(arr, k) {
  let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
  let maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]; // slide: add new, remove old
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}
// Time: O(n), Space: O(1)

Dynamic Window - Longest Substring No Repeat (LC #3):
function lengthOfLongestSubstring(s) {
  const map = new Map(); // char -> last seen index
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1); // shrink from left
    }
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

Dynamic Window - Minimum Window Substring (LC #76):
function minWindow(s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  let left = 0, have = 0, required = need.size, result = '';
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (need.has(c)) {
      need.set(c, need.get(c) - 1);
      if (need.get(c) === 0) have++;
    }
    while (have === required) {
      const window = s.slice(left, right + 1);
      if (!result || window.length < result.length) result = window;
      const lc = s[left++];
      if (need.has(lc)) {
        if (need.get(lc) === 0) have--;
        need.set(lc, need.get(lc) + 1);
      }
    }
  }
  return result;
}

LeetCode: #3, #76, #121, #209, #239, #424, #567, #643`
  },
  {
    id: "k003",
    topic: "Binary Search",
    content: `Binary Search eliminates half the search space each iteration, achieving O(log n) on sorted arrays. It also applies to "search on answer" problems.

Classic Binary Search:
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2); // avoids overflow
    if (arr[mid] === target) return mid;
    arr[mid] < target ? (left = mid + 1) : (right = mid - 1);
  }
  return -1;
}
// Time: O(log n), Space: O(1)

Find first/last occurrence (leftmost/rightmost):
function firstOccurrence(arr, target) {
  let left = 0, right = arr.length - 1, result = -1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) { result = mid; right = mid - 1; } // keep going left
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return result;
}

Binary Search on Answer (LC #875 - Koko Eating Bananas):
function minEatingSpeed(piles, h) {
  let left = 1, right = Math.max(...piles);
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const hours = piles.reduce((sum, p) => sum + Math.ceil(p / mid), 0);
    hours <= h ? (right = mid) : (left = mid + 1);
  }
  return left;
}

Search in Rotated Sorted Array (LC #33):
function searchRotated(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) { // left half is sorted
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else { // right half is sorted
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}

Key insight: Binary search applies whenever the search space is monotonic (answer has a clear boundary between valid/invalid).
LeetCode: #33, #34, #153, #162, #278, #410, #875`
  },
  {
    id: "k004",
    topic: "BFS - Breadth First Search",
    content: `BFS explores nodes level by level using a queue. It finds the shortest path in unweighted graphs and solves level-order tree problems.

Standard BFS Template:
function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  let level = 0;
  while (queue.length) {
    const size = queue.length; // process all nodes at current level
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      // process node
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    level++;
  }
}
// Time: O(V+E), Space: O(V)

Level Order Traversal (LC #102):
function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const level = [], size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

Shortest Path in Grid (0/1 matrix, LC #542):
function shortestPath(grid) {
  const m = grid.length, n = grid[0].length;
  const dist = Array.from({length: m}, () => Array(n).fill(Infinity));
  const queue = [];
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      if (grid[i][j] === 0) { dist[i][j] = 0; queue.push([i, j]); }
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
  while (queue.length) {
    const [r, c] = queue.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] > dist[r][c] + 1) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
  return dist;
}

Word Ladder pattern: Build adjacency by replacing each character, BFS for shortest transformation.
LeetCode: #102, #103, #127, #200, #286, #542, #994`
  },
  {
    id: "k005",
    topic: "DFS and Backtracking",
    content: `DFS explores as deep as possible before backtracking. Backtracking prunes branches that can't lead to a solution, making it efficient for constraint satisfaction.

DFS on Graph:
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  // process node
  for (const neighbor of graph[node]) dfs(graph, neighbor, visited);
}
// Time: O(V+E), Space: O(V) for recursion stack

Backtracking Template:
function backtrack(result, current, ...params) {
  if (baseCase) { result.push([...current]); return; }
  for (const choice of choices) {
    if (!isValid(choice)) continue; // prune
    current.push(choice); // choose
    backtrack(result, current, ...updatedParams); // explore
    current.pop(); // unchoose (backtrack)
  }
}

Permutations (LC #46):
function permute(nums) {
  const result = [];
  function bt(current, remaining) {
    if (!remaining.length) { result.push([...current]); return; }
    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]);
      bt(current, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
      current.pop();
    }
  }
  bt([], nums);
  return result;
}
// Time: O(n * n!), Space: O(n)

Subsets (LC #78):
function subsets(nums) {
  const result = [];
  function bt(start, current) {
    result.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      bt(i + 1, current);
      current.pop();
    }
  }
  bt(0, []);
  return result;
}

N-Queens (LC #51):
function solveNQueens(n) {
  const result = [], board = Array(n).fill(null).map(() => Array(n).fill('.'));
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();
  function bt(row) {
    if (row === n) { result.push(board.map(r => r.join(''))); return; }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      board[row][col] = 'Q';
      cols.add(col); diag1.add(row - col); diag2.add(row + col);
      bt(row + 1);
      board[row][col] = '.';
      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
    }
  }
  bt(0);
  return result;
}

LeetCode: #46, #47, #51, #78, #79, #90, #131, #212`
  },
  {
    id: "k006",
    topic: "Dynamic Programming",
    content: `Dynamic Programming breaks problems into overlapping subproblems and stores results to avoid redundant work. Key insight: optimal substructure + overlapping subproblems.

Approaches:
1. Top-down (memoization): recursion + cache
2. Bottom-up (tabulation): iterative, fill dp table

Identify DP: "count ways", "min/max cost", "longest/shortest sequence", "is it possible"

Fibonacci - Top-down vs Bottom-up:
// Memoization
function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  return memo[n] = fib(n-1, memo) + fib(n-2, memo);
}
// Tabulation  
function fib(n) {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
  return dp[n];
}

Climbing Stairs (LC #70):
function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    [prev2, prev1] = [prev1, prev1 + prev2];
  }
  return prev1;
}

House Robber (LC #198):
function rob(nums) {
  let prev2 = 0, prev1 = 0;
  for (const num of nums) {
    [prev2, prev1] = [prev1, Math.max(prev1, prev2 + num)];
  }
  return prev1;
}

Coin Change (LC #322):
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

Longest Increasing Subsequence (LC #300):
function lengthOfLIS(nums) {
  const dp = Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  return Math.max(...dp);
}
// Time: O(n²), can be O(n log n) with binary search

LeetCode: #70, #121, #198, #213, #300, #322, #377, #416`
  },
  {
    id: "k007",
    topic: "DP on Grids and Strings",
    content: `2D DP problems involve grids or comparing two sequences (strings). Define dp[i][j] as answer for subproblem involving first i rows/characters.

Unique Paths (LC #62):
function uniquePaths(m, n) {
  const dp = Array.from({length: m}, () => Array(n).fill(1));
  for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++)
      dp[i][j] = dp[i-1][j] + dp[i][j-1];
  return dp[m-1][n-1];
}
// Time: O(m*n), Space: O(m*n) -> optimize to O(n)

Longest Common Subsequence (LC #1143):
function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({length: m+1}, () => Array(n+1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i-1] === text2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}

Edit Distance (LC #72):
function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({length: m+1}, (_, i) => Array.from({length: n+1}, (_, j) => i || j));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i-1] === word2[j-1]) dp[i][j] = dp[i-1][j-1];
      else dp[i][j] = 1 + Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}

0/1 Knapsack:
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({length: n+1}, () => Array(capacity+1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i-1][w]; // don't take
      if (weights[i-1] <= w)
        dp[i][w] = Math.max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1]); // take
    }
  }
  return dp[n][capacity];
}

LeetCode: #62, #63, #64, #72, #97, #115, #1143`
  },
  {
    id: "k008",
    topic: "Linked Lists",
    content: `Linked List problems require pointer manipulation. Key operations: reversal, merge, cycle detection, finding intersections.

Reverse Linked List (LC #206):
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
// Time: O(n), Space: O(1)

Reverse in K Groups (LC #25):
function reverseKGroup(head, k) {
  let node = head, count = 0;
  while (node && count < k) { node = node.next; count++; }
  if (count < k) return head;
  let prev = null, curr = head;
  for (let i = 0; i < k; i++) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  head.next = reverseKGroup(curr, k);
  return prev;
}

Merge Two Sorted Lists (LC #21):
function mergeTwoLists(l1, l2) {
  const dummy = { next: null };
  let curr = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
    else { curr.next = l2; l2 = l2.next; }
    curr = curr.next;
  }
  curr.next = l1 || l2;
  return dummy.next;
}

Find Duplicate Number (Floyd's, LC #287):
function findDuplicate(nums) {
  let slow = nums[0], fast = nums[0];
  do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow !== fast);
  fast = nums[0];
  while (slow !== fast) { slow = nums[slow]; fast = nums[fast]; }
  return slow;
}

Remove Nth from End (two pass or two pointer trick):
function removeNthFromEnd(head, n) {
  const dummy = { next: head };
  let fast = dummy, slow = dummy;
  for (let i = 0; i <= n; i++) fast = fast.next;
  while (fast) { slow = slow.next; fast = fast.next; }
  slow.next = slow.next.next;
  return dummy.next;
}

LeetCode: #2, #19, #21, #23, #24, #25, #141, #142, #206, #287`
  },
  {
    id: "k009",
    topic: "Stacks and Monotonic Stack",
    content: `Stacks solve "next greater/smaller element" problems, parenthesis matching, and expression evaluation. A monotonic stack maintains elements in increasing or decreasing order.

Valid Parentheses (LC #20):
function isValid(s) {
  const stack = [], map = { ')': '(', '}': '{', ']': '[' };
  for (const c of s) {
    if ('({['.includes(c)) stack.push(c);
    else if (stack.pop() !== map[c]) return false;
  }
  return stack.length === 0;
}

Next Greater Element (monotonic stack):
function nextGreaterElement(nums) {
  const result = Array(nums.length).fill(-1);
  const stack = []; // stores indices, decreasing values
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      result[stack.pop()] = nums[i];
    }
    stack.push(i);
  }
  return result;
}
// Time: O(n), each element pushed/popped once

Largest Rectangle in Histogram (LC #84):
function largestRectangleArea(heights) {
  const stack = [-1]; // sentinel
  heights.push(0); // force flush at end
  let maxArea = 0;
  for (let i = 0; i < heights.length; i++) {
    while (stack[stack.length - 1] !== -1 && heights[i] < heights[stack[stack.length - 1]]) {
      const h = heights[stack.pop()];
      const w = i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, h * w);
    }
    stack.push(i);
  }
  return maxArea;
}

Daily Temperatures (LC #739):
function dailyTemperatures(temps) {
  const result = Array(temps.length).fill(0);
  const stack = []; // decreasing temperature indices
  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
      const j = stack.pop();
      result[j] = i - j;
    }
    stack.push(i);
  }
  return result;
}

Monotonic Decreasing Stack: pop when new element is GREATER (finds next greater)
Monotonic Increasing Stack: pop when new element is SMALLER (finds next smaller)

LeetCode: #20, #42, #84, #85, #155, #232, #739, #901`
  },
  {
    id: "k010",
    topic: "Heaps and Priority Queue",
    content: `A heap (priority queue) gives O(log n) insert/delete and O(1) peek. Min-heap gives smallest element, max-heap gives largest. JavaScript lacks a built-in heap; implement one or simulate.

Min Heap Implementation in JavaScript:
class MinHeap {
  constructor() { this.heap = []; }
  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }
  pop() {
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length) { this.heap[0] = last; this._sinkDown(0); }
    return min;
  }
  peek() { return this.heap[0]; }
  size() { return this.heap.length; }
  _bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] > this.heap[i]) {
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
        i = parent;
      } else break;
    }
  }
  _sinkDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i, left = 2*i+1, right = 2*i+2;
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}

Kth Largest Element (LC #215) - Use min-heap of size k:
function findKthLargest(nums, k) {
  const heap = new MinHeap();
  for (const num of nums) {
    heap.push(num);
    if (heap.size() > k) heap.pop();
  }
  return heap.peek();
}
// Time: O(n log k), Space: O(k)

Top K Frequent Elements (LC #347):
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
  const heap = new MinHeap(); // [freq, num]
  for (const [num, count] of freq) {
    heap.push([count, num]);
    if (heap.size() > k) heap.pop();
  }
  return heap.heap.map(([, num]) => num);
}

Merge K Sorted Lists (LC #23):
Use a min-heap with [node.val, node] for all list heads, extract min, add next node.

LeetCode: #23, #215, #295, #347, #373, #378, #502, #621`
  },
  {
    id: "k011",
    topic: "Graph Algorithms",
    content: `Graphs require BFS for shortest paths, DFS for connectivity, Topological Sort for DAGs, and Union-Find for grouping.

Adjacency List from Edge List:
function buildGraph(n, edges) {
  const graph = Array.from({length: n}, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u); // omit for directed
  }
  return graph;
}

Number of Islands (LC #200) - DFS flood fill:
function numIslands(grid) {
  let count = 0;
  function dfs(r, c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // mark visited
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < grid[0].length; c++)
      if (grid[r][c] === '1') { dfs(r, c); count++; }
  return count;
}

Topological Sort - Kahn's Algorithm (BFS):
function topoSort(n, prerequisites) {
  const graph = Array.from({length: n}, () => []);
  const inDegree = Array(n).fill(0);
  for (const [a, b] of prerequisites) { graph[b].push(a); inDegree[a]++; }
  const queue = [];
  for (let i = 0; i < n; i++) if (inDegree[i] === 0) queue.push(i);
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of graph[node]) if (--inDegree[next] === 0) queue.push(next);
  }
  return order.length === n ? order : []; // empty if cycle
}

Union Find (Disjoint Set Union):
class UnionFind {
  constructor(n) { this.parent = [...Array(n).keys()]; this.rank = Array(n).fill(0); }
  find(x) { return this.parent[x] === x ? x : (this.parent[x] = this.find(this.parent[x])); }
  union(x, y) {
    const [px, py] = [this.find(x), this.find(y)];
    if (px === py) return false;
    this.rank[px] >= this.rank[py] ? (this.parent[py] = px, this.rank[px] === this.rank[py] && this.rank[px]++) : (this.parent[px] = py);
    return true;
  }
}

Dijkstra's Shortest Path (greedy with min-heap):
function dijkstra(graph, src) {
  const dist = Array(graph.length).fill(Infinity);
  dist[src] = 0;
  const heap = new MinHeap(); // [dist, node]
  heap.push([0, src]);
  while (heap.size()) {
    const [d, u] = heap.pop();
    if (d > dist[u]) continue;
    for (const [v, w] of graph[u])
      if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; heap.push([dist[v], v]); }
  }
  return dist;
}

LeetCode: #133, #200, #207, #210, #261, #323, #399, #547, #684`
  },
  {
    id: "k012",
    topic: "Trees and Binary Search Tree",
    content: `Trees are hierarchical structures. Binary trees have at most 2 children. BSTs have left < root < right, giving O(log n) search in balanced trees.

Tree Traversals:
function inorder(root, result = []) {  // Left-Root-Right: sorted order for BST
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}
function preorder(root, result = []) { // Root-Left-Right: serialize tree
  if (!root) return result;
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}

Iterative Inorder (LC #94):
function inorderIterative(root) {
  const result = [], stack = [];
  let curr = root;
  while (curr || stack.length) {
    while (curr) { stack.push(curr); curr = curr.left; }
    curr = stack.pop();
    result.push(curr.val);
    curr = curr.right;
  }
  return result;
}

Maximum Depth of Binary Tree (LC #104):
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

Lowest Common Ancestor (LC #236):
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  return left && right ? root : left || right;
}

Diameter of Binary Tree (LC #543):
function diameterOfBinaryTree(root) {
  let maxDiam = 0;
  function height(node) {
    if (!node) return 0;
    const left = height(node.left), right = height(node.right);
    maxDiam = Math.max(maxDiam, left + right);
    return 1 + Math.max(left, right);
  }
  height(root);
  return maxDiam;
}

Validate BST (LC #98):
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}

LeetCode: #94, #98, #100, #104, #105, #110, #124, #230, #236, #543`
  },
  {
    id: "k013",
    topic: "Hashing and Hash Maps",
    content: `Hash maps give O(1) average lookup/insert. Use them for frequency counting, grouping, caching, and two-sum style complement problems.

Two Sum (LC #1) - Classic hash map pattern:
function twoSum(nums, target) {
  const map = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}
// Time: O(n), Space: O(n)

Group Anagrams (LC #49):
function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}

Frequency Count Pattern:
function majorityElement(nums) { // LC #169
  const count = new Map();
  for (const n of nums) count.set(n, (count.get(n) || 0) + 1);
  for (const [num, freq] of count) if (freq > nums.length / 2) return num;
}

Subarray Sum Equals K (LC #560) - prefix sum + hash map:
function subarraySum(nums, k) {
  const prefixCount = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const num of nums) {
    sum += num;
    count += prefixCount.get(sum - k) || 0;
    prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
  }
  return count;
}

Longest Consecutive Sequence (LC #128) - O(n) with Set:
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let maxLen = 0;
  for (const num of numSet) {
    if (!numSet.has(num - 1)) { // start of sequence
      let len = 1;
      while (numSet.has(num + len)) len++;
      maxLen = Math.max(maxLen, len);
    }
  }
  return maxLen;
}

LRU Cache (LC #146) - Map preserves insertion order in JS:
class LRUCache {
  constructor(capacity) { this.cap = capacity; this.cache = new Map(); }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key); this.cache.set(key, val); // move to end
    return val;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.cap) this.cache.delete(this.cache.keys().next().value);
    this.cache.set(key, value);
  }
}

LeetCode: #1, #49, #128, #146, #169, #347, #380, #560`
  },
  {
    id: "k014",
    topic: "Sorting Algorithms",
    content: `Understanding sorting algorithms demonstrates CS fundamentals. Interviewers commonly ask about merge sort (stable, O(n log n)) and quick sort (in-place, average O(n log n)).

Merge Sort - Divide and Conquer:
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    left[i] <= right[j] ? result.push(left[i++]) : result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}
// Time: O(n log n), Space: O(n), Stable: YES

Quick Sort - Partition and Conquer:
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return;
  const pivotIdx = partition(arr, low, high);
  quickSort(arr, low, pivotIdx - 1);
  quickSort(arr, pivotIdx + 1, high);
}
function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
// Time: O(n log n) avg, O(n²) worst, Space: O(log n), Stable: NO

Count Inversions (Merge Sort variant):
function countInversions(arr) {
  if (arr.length <= 1) return { arr, count: 0 };
  const mid = Math.floor(arr.length / 2);
  const left = countInversions(arr.slice(0, mid));
  const right = countInversions(arr.slice(mid));
  let count = left.count + right.count, i = 0, j = 0;
  const merged = [];
  while (i < left.arr.length && j < right.arr.length) {
    if (left.arr[i] <= right.arr[j]) merged.push(left.arr[i++]);
    else { count += left.arr.length - i; merged.push(right.arr[j++]); }
  }
  return { arr: [...merged, ...left.arr.slice(i), ...right.arr.slice(j)], count };
}

Algorithm Comparison:
| Algorithm   | Best      | Average   | Worst     | Space     | Stable |
|-------------|-----------|-----------|-----------|-----------|--------|
| Merge Sort  | O(n log n)| O(n log n)| O(n log n)| O(n)      | Yes    |
| Quick Sort  | O(n log n)| O(n log n)| O(n²)     | O(log n)  | No     |
| Heap Sort   | O(n log n)| O(n log n)| O(n log n)| O(1)      | No     |
| Bubble Sort | O(n)      | O(n²)     | O(n²)     | O(1)      | Yes    |
| Insertion   | O(n)      | O(n²)     | O(n²)     | O(1)      | Yes    |

LeetCode: #56, #75, #148, #179, #215, #493, #912`
  },
  {
    id: "k015",
    topic: "Time and Space Complexity",
    content: `Big O notation describes algorithm performance as input size grows. Interviewers always ask about complexity — always analyze your solution.

Common Complexities (fastest to slowest):
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!)

O(1) - Constant: hash map lookup, array access by index
O(log n) - Logarithmic: binary search, balanced BST operations, heap push/pop
O(n) - Linear: single loop, BFS/DFS, two pointers
O(n log n) - Linearithmic: merge sort, heap sort, efficient sorting
O(n²) - Quadratic: nested loops, bubble sort, brute force pair search
O(2^n) - Exponential: all subsets, brute force Fibonacci
O(n!) - Factorial: all permutations, TSP brute force

Space Complexity:
- Recursion stack = O(depth). DFS on tree: O(h) where h = height. BFS: O(width of widest level)
- Storing n elements: O(n). Storing matrix: O(n²)
- Memoization of n states: O(n). 2D DP table: O(n*m) -> often optimizable to O(n)

Recognizing Complexity from Code:
// O(n): one loop
for (let i = 0; i < n; i++) { ... }

// O(n²): nested loops
for (let i = 0; i < n; i++)
  for (let j = 0; j < n; j++) { ... }

// O(log n): halving each iteration
while (n > 1) { n = Math.floor(n / 2); }

// O(n log n): loop + log operation
for (let i = 0; i < n; i++) heap.push(arr[i]); // O(n log n)

// O(n): appears O(n²) but each element pushed/popped once (amortized)
for (let i = 0; i < n; i++) {
  while (stack.length && ...) stack.pop(); // monotonic stack trick
  stack.push(i);
}

Space Optimization Tips:
- 2D DP -> 1D rolling array: if dp[i] only depends on dp[i-1]
- Store indices instead of values when possible
- Use in-place algorithms (two pointers) to achieve O(1) space

Interview tip: Always state time AND space complexity after writing your solution. Mention if the space is due to the output (which usually doesn't count) vs auxiliary space.`
  }
];
