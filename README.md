# 使用说明

## Run
```bash
# clone the project
git clone http://10.18.6.177/tms/web.git

# enter the project directory
cd 

# install dependency
npm install --registery=https://registry.npm.taobao.org

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information

## Demo

![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Extra

If you want router permission && generate menu by user roles , you can use this branch [permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

For `typescript` version, you can use [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (Credits: [@Armour](https://github.com/Armour))


## Browsers support
Modern browsers and Internet Explorer 10+.

| IE / Edge |Firefox | Chrome |Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

