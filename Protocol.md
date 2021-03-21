# 目录

- [1. 查询游戏记录](#1%E6%9F%A5%E8%AF%A2%E6%B8%B8%E6%88%8F%E8%AE%B0%E5%BD%95)

- [2. 查询消费金票记录](#2%E6%9F%A5%E8%AF%A2%E6%B6%88%E8%B4%B9%E9%87%91%E7%A5%A8%E8%AE%B0%E5%BD%95)

- [3. 查询获取欢乐豆记录](#3-%E6%9F%A5%E8%AF%A2%E8%8E%B7%E5%8F%96%E6%AC%A2%E4%B9%90%E8%B1%86%E8%AE%B0%E5%BD%95)

- [4. 查询当前金票](#4-%E6%9F%A5%E8%AF%A2%E5%BD%93%E5%89%8D%E9%87%91%E7%A5%A8)

- [5. 查询当前欢乐豆](#5-%E6%9F%A5%E8%AF%A2%E5%BD%93%E5%89%8D%E6%AC%A2%E4%B9%90%E8%B1%86)

- [6. 查询营收](#6-%E6%9F%A5%E8%AF%A2%E8%90%A5%E6%94%B6)

- [7. 添加游戏记录](#7-%E6%B7%BB%E5%8A%A0%E6%B8%B8%E6%88%8F%E8%AE%B0%E5%BD%95)

- [8. 添加消费金票记录](#8-%E6%B7%BB%E5%8A%A0%E6%B6%88%E8%B4%B9%E9%87%91%E7%A5%A8%E8%AE%B0%E5%BD%95)

- [9. 添加获取欢乐豆记录](#9-%E6%B7%BB%E5%8A%A0%E8%8E%B7%E5%8F%96%E6%AC%A2%E4%B9%90%E8%B1%86%E8%AE%B0%E5%BD%95)

- [10. 删除游戏记录](#10-%E5%88%A0%E9%99%A4%E6%B8%B8%E6%88%8F%E8%AE%B0%E5%BD%95)

- [11. 删除消费金票记录](#11-%E5%88%A0%E9%99%A4%E6%B6%88%E8%B4%B9%E9%87%91%E7%A5%A8%E8%AE%B0%E5%BD%95)

- [12. 删除获取欢乐豆记录](#12-%E5%88%A0%E9%99%A4%E8%8E%B7%E5%8F%96%E6%AC%A2%E4%B9%90%E8%B1%86%E8%AE%B0%E5%BD%95)

---

## 1.查询游戏记录

### 接口功能

获取指定玩家在指定时间范围内的游戏结果

### URL

```records/games```

### HTTP请求方式

```GET```

### HTTP返回格式

```application/json```

### 请求参数 

|名称|必选|类型|方式|说明|示例|
|:-:|:-:|:-:|:-:|:-:|:-|
|token|ture|string|url|玩家标识|s21294|
|start|true|string|querystring|开始时间|1616169600|
|end|true|string|querystring|结束时间|1616255999|

### 返回字段

|名称|字段类型|说明|示例|
|:-:|:-:|:-:|:-:|
|status|string|返回结果状态|[status 值说明](#status)|
|data|json array|游戏结果集|见下表|

#### data

|字段|类型|说明|示例|
|:-:|:-:|:-:|:-|
|guid|string|唯一标识|\|
|player_id|string|玩家标识|s21294|
|room|string|房间类型|[room 值说明](#room)|
|landlord|string|地主武将名称|SP赵云|
|farmer1|string|1号农名武将名称|孙鲁育|
|farmer2|string|2号农名武将名称|界关羽|
|is_win|string|是否获得胜利|[is_win 值说明](#is_win)|
|role|string|角色类型|[role 值说明](#role)|
|multiple|string|押金倍数|[multiple 值说明](#multiple)|
|golds|string|获得金票|600|
|beans|string|获得欢乐豆|-20|
|is_flee|string|是否逃跑|[is_flee 值说明](#is_flee)|
|remarks|string|备注|赢在运气好|
|timestamp|string|时间戳|1616247816|

### 请求接口示例

```/records/games/s21294?start=1616169600&end=1616255999```

### 返回接口示例

``` javascript
{
    "status": "0",
    "data": [
        {
            "guid": "a2f12ac0-8982-11eb-b31a-ebc525dd2dfa",
            "player_id": "s21294",
            "room": "0",
            "landlord": "SP赵云",
            "farmer1": "孙鲁育",
            "farmer2": "界关羽",
            "is_win": "1",
            "role": "0",
            "multiple": "3",
            "golds": "600",
            "beans": "-20",
            "is_flee": "0",
            "remarks": "赢在运气好",
            "timestamp": "1616247973"
        },
        {
            "guid": "455dc8a0-8982-11eb-b31a-ebc525dd2dfa",
            "player_id": "s21294",
            "room": "0",
            "landlord": "麴义",
            "farmer1": "大乔",
            "farmer2": "界刘表",
            "is_win": "1",
            "role": "0",
            "multiple": "3",
            "golds": "600",
            "beans": "-20",
            "is_flee": "0",
            "remarks": "",
            "timestamp": "1616247816"
        }
    ]
}
```

---

## 2.查询消费金票记录

### 接口功能

获取指定玩家消费金票记录

### URL

```records/golds```

### HTTP请求方式

```GET```

### HTTP返回格式

```application/json```

### 请求参数 

|名称|必选|类型|方式|说明|示例|
|:-:|:-:|:-:|:-:|:-:|:-|
|token|ture|string|url|玩家标识|s21294|

### 返回字段

|名称|字段类型|说明|示例|
|:-:|:-:|:-:|:-:|
|status|string|返回结果状态|[status 值说明](#status)|
|data|json array|游戏结果集|见下表|

#### data

|字段|类型|说明|示例|
|:-:|:-:|:-:|:-|
|guid|string|唯一标识|\|
|player_id|string|玩家标识|s21294|
|count|string|金票数量|2000|
|mode|string|获取方式|[mode 值说明](#golds-mode)|
|timestamp|string|时间戳|1616246387|

### 请求接口示例

```/records/golds/s21294```

### 返回接口示例

``` javascript
{
    "status": "0",
    "data": [
        {
            "count": "2000",
            "guid": "f1505370-897e-11eb-a3aa-d7b015a34446",
            "mode": "13",
            "player_id": "s21294",
            "timestamp": "1616246387"
        },
        {
            "count": "2350",
            "guid": "c89d5810-889d-11eb-8020-91494847a716",
            "mode": "11",
            "player_id": "s21294",
            "timestamp": "1616149682"
        }
    ]
}
```

---

## 3. 查询获取欢乐豆记录

### 接口功能

获取指定玩家获取欢乐豆记录

### URL

```records/beans```

### HTTP请求方式

```GET```

### HTTP返回格式

```application/json```

### 请求参数 

|名称|必选|类型|方式|说明|示例|
|:-:|:-:|:-:|:-:|:-:|:-|
|token|ture|string|url|玩家标识|s21294|

### 返回字段

|名称|字段类型|说明|示例|
|:-:|:-:|:-:|:-:|
|status|string|返回结果状态|[status 值说明](#status)|
|data|json array|游戏结果集|见下表|

#### data

|字段|类型|说明|示例|
|:-:|:-:|:-:|:-|
|guid|string|唯一标识|\|
|player_id|string|玩家标识|s21294|
|count|string|欢乐豆数量|2000|
|mode|string|获取方式|[mode 值说明](#beans-mode)|
|timestamp|string|时间戳|1616246387|

### 请求接口示例

```/records/beans/s21294```

### 返回接口示例

``` javascript
{
    "status": "0",
    "data": [
        {
            "count": "2000",
            "guid": "7ef361d0-8a48-11eb-b31a-ebc525dd2dfa",
            "mode": "6",
            "player_id": "s21294",
            "timestamp": "1616332953"
        },
        {
            "count": "165",
            "guid": "f2aed200-897e-11eb-a3aa-d7b015a34446",
            "mode": "0",
            "player_id": "s21294",
            "timestamp": "1616246389"
        }
    ]
}
```

---


## 4. 查询当前金票

### 接口功能

获取指定玩家当前所拥有的金票数量

### URL

```assets/golds```

### HTTP请求方式

```GET```

### HTTP返回格式

```application/json```

### 请求参数 

|名称|必选|类型|方式|说明|示例|
|:-:|:-:|:-:|:-:|:-:|:-:|
|token|ture|string|url|玩家标识|s21294|

### 返回字段

|名称|字段类型|说明|示例|
|:-:|:-:|:-:|:-:|
|status|string|返回结果状态|[status 值说明](#status)|
|data|string|金票数量|2000|

### 请求接口示例

```/assets/golds/s21294```

### 返回接口示例

``` javascript
{
    "status": "0",
    "data": "2000"
}
```

---

## 5. 查询当前欢乐豆

### 接口功能

获取指定玩家当前所拥有的欢乐豆数量

### URL

```assets/beans```

### HTTP请求方式

```GET```

### HTTP返回格式

```application/json```

### 请求参数 

|名称|必选|类型|方式|说明|示例|
|:-:|:-:|:-:|:-:|:-:|:-:|
|token|ture|string|url|玩家标识|s21294|

### 返回字段

|名称|字段类型|说明|示例|
|:-:|:-:|:-:|:-:|
|status|string|返回结果状态|[status 值说明](#status)|
|data|string|欢乐豆数量|100|

### 请求接口示例

```/assets/beans/s21294```

### 返回接口示例

``` javascript
{
    "status": "0",
    "data": "100"
}
```

---

## 6. 查询营收

### 接口功能

获取指定玩家在指定时间段内获取的金票与消耗的欢乐豆

### URL

```records/income```

### HTTP请求方式

```GET```

### HTTP返回格式

```application/json```

### 请求参数 

|名称|必选|类型|方式|说明|示例|
|:-:|:-:|:-:|:-:|:-:|:-:|
|token|ture|string|url|玩家标识|s21294|
|start|true|string|querystring|开始时间|1616169600|
|end|true|string|querystring|结束时间|1616255999|

### 返回字段

|名称|字段类型|说明|示例|
|:-:|:-:|:-:|:-:|
|status|string|返回结果状态|[status 值说明](#status)|
|data|json array|营收结果|见下表|

#### data

|字段|类型|说明|示例|
|:-:|:-:|:-:|:-|
|beans|string|金票数量|1200|
|golds|string|欢乐豆数量|-600|

### 请求接口示例

```/records/income/s21294?start=1616169600&end=1616255999```

### 返回接口示例

``` javascript
{
    "status": "0",
    "data": {
        "beans": "1200",
        "golds": "-600"
    }
}
```

---

## 7. 添加游戏记录

### 接口功能

用户输入并上传游戏记录，当前账户内的金票数量加上获得金票数量，当前账户内的欢乐豆数量减去获取欢乐豆数量

### URL

```records/games```

### HTTP请求方式

```POST```

### HTTP请求格式

```application/json```

### HTTP返回格式

```application/json```

### 请求参数 

|名称|必选|类型|方式|说明|示例|
|:-:|:-:|:-:|:-:|:-:|:-|
|token|ture|string|url|玩家标识|s21294|
|data|true|json object|body|游戏详情|见下表|

#### data

|字段|类型|说明|示例|
|:-:|:-:|:-:|:-|
|room|string|房间类型|[room 值说明](#room)|
|landlord|string|地主武将名称|SP赵云|
|farmer1|string|1号农名武将名称|张让|
|farmer2|string|2号农名武将名称|秦宓|
|is_win|string|是否获得胜利|[is_win 值说明](#is_win)|
|role|string|角色类型|[role 值说明](#role)|
|multiple|string|押金倍数|[multiple 值说明](#multiple)|
|golds|string|获得金票|0|
|beans|string|获得欢乐豆|-300|
|is_flee|string|是否逃跑|[is_flee 值说明](#is_flee)|
|remarks|string|备注|赢在运气好|

### 返回字段

|名称|字段类型|说明|示例|
|:-:|:-:|:-:|:-:|
|status|string|返回结果状态|[status 值说明](#status)|

### 请求接口示例

```/records/games/s21294```

```javascript
{
    "room":"0",
    "landlord":"SP赵云",
    "farmer1":"张让",
    "farmer2":"秦宓",
    "isWin":"0",
    "role":"2",
    "multiple":"3",
    "golds":"0",
    "beans":"-300",
    "remarks":"被克死死的",
    "isFlee":"0"
}
```

### 返回接口示例

``` javascript
{
    "status": "0"
}
```

---

## 8. 添加消费金票记录

### 接口功能

用户输入并上传消费金票记录，当前账户内的金票数量减去消费金票数量

### URL

```records/golds```

### HTTP请求方式

```POST```

### HTTP请求格式

```application/json```

### HTTP返回格式

```application/json```

### 请求参数 

|名称|必选|类型|方式|说明|示例|
|:-:|:-:|:-:|:-:|:-:|:-|
|token|ture|string|url|玩家标识|s21294|
|data|true|json object|body|消费金票详情|见下表|

#### data

|字段|类型|说明|示例|
|:-:|:-:|:-:|:-|
|count|string|金票数量|2000|
|mode|string|金票用途|[mode 值说明](#golds-mode)|

### 返回字段

|名称|字段类型|说明|示例|
|:-:|:-:|:-:|:-:|
|status|string|返回结果状态|[status 值说明](#status)|

### 请求接口示例

```/records/golds/s21294```

```javascript
{
    "count":"2000",
    "mode":"13"
}
```

### 返回接口示例

``` javascript
{
    "status": "0"
}
```

---

## 9. 添加获取欢乐豆记录

### 接口功能

用户输入并上传获取欢乐豆记录，当前账户内的欢乐豆数量加上获取欢乐豆数量

### URL

```records/beans```

### HTTP请求方式

```POST```

### HTTP请求格式

```application/json```

### HTTP返回格式

```application/json```

### 请求参数 

|名称|必选|类型|方式|说明|示例|
|:-:|:-:|:-:|:-:|:-:|:-|
|token|ture|string|url|玩家标识|s21294|
|data|true|json object|body|获取欢乐豆详情|见下表|

#### data

|字段|类型|说明|示例|
|:-:|:-:|:-:|:-|
|count|string|欢乐豆数量|2000|
|mode|string|欢乐豆来源|[mode 值说明](#beans-mode)|

### 返回字段

|名称|字段类型|说明|示例|
|:-:|:-:|:-:|:-:|
|status|string|返回结果状态|[status 值说明](#status)|

### 请求接口示例

```/records/beans/s21294```

```javascript
{
    "count":"2000",
    "mode":"6"
}
```

### 返回接口示例

``` javascript
{
    "status": "0"
}
```

---

## 10. 删除游戏记录

### 接口功能

用户删除游戏记录

### URL

```records/games```

### HTTP请求方式

```DELETE```

### HTTP返回格式

```application/json```

### 请求参数 

|名称|必选|类型|方式|说明|示例|
|:-:|:-:|:-:|:-:|:-:|:-|
|token|ture|string|url|玩家标识|s21294|
|guid|true|string|querystring|该条记录的guid|\|
|golds|true|string|querystring|因该条记录获得金票数量|\|
|beans|true|string|querystring|因该条记录消耗欢乐豆数量|\|

### 返回字段

|名称|字段类型|说明|示例|
|:-:|:-:|:-:|:-:|
|status|string|返回结果状态|[status 值说明](#status)|

### 请求接口示例

```/records/games/s21294?guid=520001f0-8a49-11eb-b31a-ebc525dd2dfa&golds=600&beans=-20```

### 返回接口示例

``` javascript
{
    "status": "0"
}
```

---

## 11. 删除消费金票记录

### 接口功能

用户删除消费金票记录，当前账户内的金票数量加上消费金票数量

### URL

```records/golds```

### HTTP请求方式

```DELETE```

### HTTP返回格式

```application/json```

### 请求参数 

|名称|必选|类型|方式|说明|示例|
|:-:|:-:|:-:|:-:|:-:|:-|
|token|ture|string|url|玩家标识|s21294|
|guid|true|string|querystring|该条记录的guid|\|
|golds|true|string|querystring|因该条记录消费金票数量|\|

### 返回字段

|名称|字段类型|说明|示例|
|:-:|:-:|:-:|:-:|
|status|string|返回结果状态|[status 值说明](#status)|

### 请求接口示例

```/records/golds/s21294?guid=520001f0-8a49-11eb-b31a-ebc525dd2dfa&golds=2000```

### 返回接口示例

``` javascript
{
    "status": "0"
}
```

---

## 12. 删除获取欢乐豆记录

### 接口功能

用户删除获取欢乐豆记录，当前账户内的欢乐豆数量减去获取欢乐豆数量

### URL

```records/beans```

### HTTP请求方式

```DELETE```

### HTTP返回格式

```application/json```

### 请求参数 

|名称|必选|类型|方式|说明|示例|
|:-:|:-:|:-:|:-:|:-:|:-|
|token|ture|string|url|玩家标识|s21294|
|guid|true|string|querystring|该条记录的guid|\|
|beans|true|string|querystring|因该条记录获取欢乐豆数量|\|

### 返回字段

|名称|字段类型|说明|示例|
|:-:|:-:|:-:|:-:|
|status|string|返回结果状态|[status 值说明](#status)|

### 请求接口示例

```/records/beans/s21294?guid=520001f0-8a49-11eb-b31a-ebc525dd2dfa&beans=2000```

### 返回接口示例

``` javascript
{
    "status": "0"
}
```

---

#### status

|值|说明|
|:-:|:-:|
|0|成功|
|-1|失败|

#### room

|值|说明|
|:-:|:-:|
|0|普通场|
|1|至尊场|

#### is_win

|值|说明|
|:-:|:-:|
|0|负|
|1|胜|

#### role

|值|说明|
|:-:|:-:|
|0|地主|
|1|1号农民|
|2|2号农民|

#### multiple

|值|说明|
|:-:|:-:|
|1|1倍|
|2|2倍|
|3|3倍|

#### is_flee
|值|说明|
|:-:|:-:|
|0|未逃跑|
|1|已逃跑|

#### golds-mode

|值|说明|对应金票数量|
|:-:|:-:|:-:|
|0|沙摩柯|99999|
|1|沙摩柯试用|500|
|2|沙摩柯皮肤|46666|
|3|鼠年大吉|300|
|4|鼠年壹号|300|
|5|银币*100|100|
|6|雁翎甲|500|
|7|雁翎甲*2|800|
|8|换将卡*50|1600|
|9|手气卡*50|1600|
|10|招募令|1000|
|11|招募令*3|2350|
|12|进阶丹|400|
|13|欢乐豆|2000|
|14|其它|0|
|15|开黑盒子|300|
|16|牛年大吉|300|

#### beans-mode

|值|说明|对应欢乐豆数量|
|:-:|:-:|:-:|
|0|每日任务|165|
|1|周薪|1000|
|2|红包|10|
|3|盒子/福袋/礼包赠送|50|
|4|签到|2|
|5|元宝/金币购买|10000|
|6|金票内循环|2000|
|7|其它|0|
|8|连胜|60|