# 文件结构和原理分析

index.html 首页 html，提供各类第三方 css/js 等静态文件，并定义一个 root div 作为根元素
main.jsx 主程序，提供 provider 把 store/reducer 放入全局上下文，PersistGate 提供持久化 store/reducer 功能
App.jsx react 主程序，提供 RouterProvider 路由功能，接收前端页面跳转功能

TourList.jsx 9 条旅游路线界面：使用 useLoaderData 获取 tour 列表
Tour.jsx 旅游路线详情界面：使用 useLoaderData 获取点击 tour 详情，useSelector 获取登录 user 信息，展示当前旅行路线的简介、图片、地图坐标、历史评论、预定按钮
Login.jsx 登陆界面：定义 state 状态: email/pwd, 登陆成功后使用 useDispatch 将 user 信息更新到 redux，并使用 navigate 跳转到首页'/'
Account.jsx 更新用户 name/email/photo，以及 password 界面：定义各种 state，修改成功后使用 useDispatch 将 user 信息更新到 redux
MyTours.jsx 展示 user 订购的 Tour 界面：
