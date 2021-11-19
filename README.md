# 實習資訊分享平台

## Contributors & Tasks

+ 組員全部 - Database schema design, ER Design
+ 郭姿筠 - API Design, Back-end using Django(User-related, Experience-related)
+ 金民亞 - API Design, Back-end using Django(Post-related, Place-related)
+ 管晟宇 - Back-end using Django(User-caterogy-related, Comment-related)
+ 杜沛慈 - Front-end Design, Logo Design
+ 林又昕 - Front-end using ReactJS, Front-end Back-end connection
+ 李妍伶 - Data colleciton and process using postgreSQL

## Database

+ 下載 PostgreSQL 13 以及 pgAdmin (GUI介面)
+ Postgres setup on MacOS
+ 匯入/匯出現有資料庫 by pdAdmin

## API

+ 討論文件：https://hackmd.io/@SofiaK0426/SJUwaEgIt

+ API endpoint: http://127.0.0.1:8000/api

+接口
> GET post/getAll </br>
> GET city </br>
> POST user/create </br>
> POST user/login </br>
> POST user/logout </br>
> POST user/myCat </br>
> POST user/exp/get </br>
> POST user/post/get </br>
> POST user/collection/create 
> POST exp/create </br>
> POST org/search </br>
> POST pos/search </br>
> POST post/create </br>
> POST post/search </br>
> POST comment/create </br>
> POST comment/get </br>
> POST collection/get </br>
> POST collection/add </br>
> POST district </br>

----------------------

## Backend

確定電腦有安裝 `python3` 以及完成上述資料匯入資料庫的指令後打開終端機執行以下指令：

```shell
# for mac
cd backend
python3 -m venv tutorial-env #建立虛擬環境 #-m: module-name
source tutorial-env/bin/activate #啟動虛擬環境 for mac
```

```shell
# for windows
cd backend
python3 -m venv tutorial-env #建立虛擬環境 #-m: module-name
tutorial-env\Scripts\activate.bat #啟動虛擬環境 for windows
```

這邊要補充怎麼開資料庫和匯資料庫---*妍伶、民亞*
```shell
```

成功的話，command prompt 前面應該會多出 `(tutorial-env)` 的字樣，代表已經進入這個虛擬環境。如果未來你想退出這個虛擬環境，可以輸入 `deactivate`。
接著下載所需套件，需要的套件與版本已定義在 `requirements.txt`，下載完輸入`pip list`檢查所有用 `pip` 下載的套件。

```shell
python -m pip install --upgrade pip #pip更新至最新版本
pip install -r requirements.txt
pip list
```
```
Package             Version
------------------- -------
asgiref             3.4.1
dj-database-url     0.5.0
Django              3.2.6
django-cors-headers 3.8.0
djangorestframework 3.12.4
pip                 21.3
psycopg2            2.9.1
python-decouple     3.4
pytz                2021.1
setuptools          47.1.0
sqlparse            0.4.1
```


安裝完套件後複製 `.env.example` 的內容到 `.env`。

>`.env`裡存的是環境變數，裡面通常會放一些機密資訊（如 `SECRET_KEY`、資料庫資訊等），這種檔案通常不會傳上版本控制系統（如 Github），但此為教學專案為了方便講解上傳，同學們實作專案時記得避免。

```shell
# for mac
cp .env.example .env
```

```shell
# for windows
copy .env.example .env
```

接著可以將 `.env` 當中的變數改成符合你電腦資料庫的值。

```shell
SECRET_KEY={aaaaaaaaa}
DEBUG=True
ALLOWED_HOSTS=.localhost,127.0.0.1
DATABASE_URL={postgres://USER:PASSWORD@HOST:PORT/NAME}
```


最後，同步資料庫並啟動 backend server。

```shell
python manage.py migrate
python3 manage.py createsuperuser #他們要求什麼你就打什麼（superuserid, password, email 之類的）
python manage.py runserver
```

用瀏覽器打開  http://127.0.0.1:8000/api/stations ，如果有順利拿到資源表示後端起成功。
![](img/api.png)

## Frontend

#### Step 0. 安裝 yarn
如果你還沒有安裝 yarn，請參考官網 https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable ，依照步驟安裝。

#### Step 1. 安裝 packages
第一次開啟專案請先用以下指令安裝所有需要的 packages，之後再次開啟專案跳過這個指令即可。
```shell
cd frontend
yarn
```

#### Step 2. 開啟前端
```shell
cd frontend
yarn start
```
#### Step 3. 開啟瀏覽器 
一般情況會自動開啟瀏覽器，若沒有請手動開啟 http://127.0.0.1:3000/ ，看到以下畫面即代表成功開啟前端且前後端連接成功。

#### 查詢選單
![截圖 2021-10-17 下午10 53 03](https://user-images.githubusercontent.com/56534481/137632819-dfc1e96b-7a0b-4086-92fe-33ec2bd48c66.png)
#### 車次時刻與適用優惠列表
![截圖 2021-10-17 下午10 55 38](https://user-images.githubusercontent.com/56534481/137632908-d0b43156-b165-4858-8930-9734e7f4d5ca.png)
#### 票價試算
![截圖 2021-10-17 下午10 56 13](https://user-images.githubusercontent.com/56534481/137632935-88a6ca29-d65c-46be-9853-eb09fb4e91f2.png)


