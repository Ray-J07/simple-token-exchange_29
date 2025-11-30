# **simple-token-exchange_29**

一个基于 **Hardhat + Solidity + 前端 Web 界面** 的去中心化简易 Token 兑换平台（Simple Token Exchange）。
用户可以通过本平台进行 **ERC20 代币兑换**、查看价格、管理授权等操作。本项目用于演示区块链基本技术栈、智能合约开发流程、前端交互、GitHub 开源协作流程。

> 本项目同时用于开源文化课程期末作业展示：包含完整项目结构、开源许可证、README、分支管理、协作流程示例。

---

# **1. 项目功能（Features）**

### 1. 简易 Token 兑换（Simple Swap）

用户可以使用 TokenA 兑换 TokenB（按照预设固定兑换比率）。

### 2. ERC20 Token 实现

包含可铸造、增发的 TestToken（测试代币）

* TokenA（A代币）
* TokenB（B代币）

### 3. 授权机制

兑换前需要用户授权合约代扣 Token。

### 4. 钱包交互（MetaMask）

前端支持：

* 链接钱包
* 查询余额
* 授权代币
* 执行兑换交易
* 显示交易结果

### 5. 前端展示界面

基于 HTML/JavaScript 的简单展示：

* 余额查看
* 输入兑换数量
* Gas 使用情况
* 交易哈希显示

---

# **2. 技术架构（Tech Stack）**

| 层级      | 技术                      |
| ------- | ----------------------- |
| 智能合约    | Solidity                |
| 开发框架    | Hardhat                 |
| 测试框架    | Mocha + Chai            |
| 前端技术    | HTML / CSS / JavaScript |
| 钱包交互    | ethers.js               |
| 本地区块链网络 | Hardhat Network         |
| 开源托管    | GitHub                  |

---

# **3. 项目目录结构（Project Structure）**

```
simple-token-exchange_29
│
├── contracts
│   ├── TestToken.sol           # ERC20 测试代币合约
│   └── SimpleExchange.sol      # 兑换合约核心逻辑
│
├── frontend
│   ├── index.html              # 前端网页界面
│   ├── app.js                  # 前端与区块链交互逻辑
│   └── style.css               # 页面样式
│
├── scripts
│   └── deploy.js               # 部署脚本，部署 Token + Exchange
│
├── test
│   └── test-exchange.js        # Hardhat 自动化测试脚本
│
├── hardhat.config.js
├── package.json
├── README.md
└── LICENSE                     # MIT License
```


分支：doc-update
本分支用于完善项目说明文档，补充安装步骤、使用方式和开源协议说明。

---

# **4. 合约设计（Smart Contract Design）**

## **TestToken.sol**

* ERC20 标准代币
* 构造时自动为部署者 mint 初始代币
* 用于测试兑换业务

## **SimpleExchange.sol**

核心功能：

### 1. 设置兑换比率

```solidity
exchangeRate = 100; // 1 TokenA = 100 TokenB
```

### 2. 兑换逻辑

* 用户需先 approve
* Exchange 合约从用户扣除 TokenA
* 合约返回等量 TokenB
* 触发 Swap 事件

---

# **5. 如何运行项目（Installation & Run）**

## **步骤 1：安装依赖**

```bash
npm install
```

## **步骤 2：启动本地区块链**

```bash
npx hardhat node
```

## **步骤 3：部署合约**

在新终端运行：

```bash
npx hardhat run scripts/deploy.js --network localhost
```

会打印：

* TokenA 部署地址
* TokenB 部署地址
* Exchange 部署地址

把地址复制填入前端 `app.js` 中。

---

# **6. 运行测试（Testing）**

执行所有测试：

```bash
npx hardhat test
```

测试覆盖：

* Token 初始余额
* 授权操作
* 兑换功能
* 合约余额正确性
* 事件触发验证

---

# **7. 前端启动方法（Frontend）**

无需 Node 服务，直接双击：

```
frontend/index.html
```

即可在浏览器中打开界面。

---

# **8. 部署脚本（deploy.js 示例）**

```js
const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("TestToken");
  const tokenA = await Token.deploy("TokenA", "TA", 1000000);
  const tokenB = await Token.deploy("TokenB", "TB", 1000000);

  await tokenA.deployed();
  await tokenB.deployed();

  console.log("TokenA:", tokenA.address);
  console.log("TokenB:", tokenB.address);

  const Exchange = await hre.ethers.getContractFactory("SimpleExchange");
  const exchange = await Exchange.deploy(tokenA.address, tokenB.address, 100);

  await exchange.deployed();

  console.log("Exchange:", exchange.address);
}

main();
```

---

# **9. 许可证（License）**

本项目采用 MIT License 开源协议，允许任何人自由复制、二次开发、分发本项目。

---

# **10. 未来功能（Project Roadmap）**

* 添加可变兑换比率
* 引入 Chainlink 实时价格
* 添加前端 React 版本
* 引入交易图表
* 添加流动性池（AMM）模型
* 引入用户交易历史记录

---

# **11. 开源协作方式（Contribution）**

欢迎通过以下方式参与：

* 提交 Issue
* 提交 Pull Request
* 完善代码
* 优化前端
* 修复 Bug
* 进行文档补充

---

# 结束语

本项目旨在帮助学习者理解区块链 DApp 开发完整流程，包括智能合约编写、测试、部署、前端交互和开源协作。在课程中可作为较完整的展示案例，也可用于继续扩展成更复杂的智能交易平台。

---

