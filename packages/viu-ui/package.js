Package.describe({
    name: 'devsignstudio:viu-ui',
    version: '0.3.3',
    summary: 'Material Design vue-meteor package',
    git: 'https://github.com/DevsignStudio/viu/',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    Npm.depends({
        'velocity-animate': '1.4.2',
        'vue-touch': '1.1.0',
        'vue-lazyload': '0.7.0',
        'swiper': '3.4.0',
        'scrollmonitor': '1.1.0',
        'scrollreveal': "3.3.2",
        'kute.js': '1.5.96',
        'numeral': '2.0.4',
        'simplebar': '2.0.3',
        'vue-charts': '0.2.1',
        'sugar': '2.0.4',
        'tilt.js': '1.1.12',
        'bellows-ui': '6.0.1',
        'mobify-plugin': '4.0.0',
        'is-touch': '1.0.2',
        'slick-carousel': '1.6.0',
        'blurify': '1.0.7',
        'node-vibrant': '3.0.0-alpha.2',
        'draggabilly': '2.1.1',
    });

    api.versionsFrom('1.4.1.1');
    api.use('ecmascript');
    api.use('fourseven:scss@4.5.0');
    api.use(['jquery','akryum:vue-component@0.8.18'], 'client');
    api.mainModule('viu-client.js', 'client');
    api.addFiles([
	'client/css/materialdesignicons.css', 
	'client/css/viu.css', 
	'client/plugin/c3/c3.css'], 'client');
    api.addFiles([
    "import.scss",
    "client/scss/viu/base/_color.scss",
    "client/scss/viu/base/_theme.scss",
    "client/scss/viu/base/_mixin.scss",
    "client/scss/viu/base/_normalize.scss",
    "client/scss/viu/base/_after.scss",
    "client/scss/viu/base/_background.scss",
    "client/scss/viu/base/_font-roboto.scss",
    "client/scss/viu/base/_grid.scss",
    "client/scss/viu/base/_loader.scss",
    "client/scss/viu/base/_ripple.scss",
    "client/scss/viu/base/_text-color.scss",
    "client/scss/viu/base/_typography.scss",
    "client/scss/viu/base/_z-depth.scss"],
    "client",
    {isImport: true});

    api.addAssets([
        // 'particles.json',
        // 'client/img/back.jpg',
        // 'client/img/back1.png',
        // 'client/img/logo.png',
        // 'client/img/devsignmy.svg',
        // 'client/img/cityscape.svg',
        // 'client/img/profile.png',
        // 'client/img/house.jpg',
        // 'client/img/house-sm.jpg',
        // 'client/img/gold.jpg',
        // 'client/img/gold-sm.jpg',
        'client/fonts/ek4gzZ-GeXAPcSbHtCeQI_esZW2xOQ-xsNqO47m55DA.woff2',
        'client/fonts/mErvLBYg_cXG3rLvUsKT_fesZW2xOQ-xsNqO47m55DA.woff2',
        'client/fonts/-2n2p-_Y08sg57CNWQfKNvesZW2xOQ-xsNqO47m55DA.woff2',
        'client/fonts/u0TOpm082MNkS5K0Q4rhqvesZW2xOQ-xsNqO47m55DA.woff2',
        'client/fonts/NdF9MtnOpLzo-noMoG0miPesZW2xOQ-xsNqO47m55DA.woff2',
        'client/fonts/Fcx7Wwv8OzT71A3E1XOAjvesZW2xOQ-xsNqO47m55DA.woff2',
        'client/fonts/CWB0XYA8bzo0kSThX0UTuA.woff2',
        'client/fonts/0eC6fl06luXEYWpBSJvXCBJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/Fl4y0QdOxyyTHEGMXX8kcRJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/-L14Jk06m6pUHB-5mXQQnRJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/I3S1wsgSg9YCurV6PUkTORJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/NYDWBdD4gIq26G5XYbHsFBJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/Pru33qjShpZSmG3z6VYwnRJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/Hgo13k-tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw.woff2',
        'client/fonts/ty9dfvLAziwdqQ2dHoyjphTbgVql8nDJpwnrE27mub0.woff2',
        'client/fonts/frNV30OaYdlFRtH2VnZZdhTbgVql8nDJpwnrE27mub0.woff2',
        'client/fonts/gwVJDERN2Amz39wrSoZ7FxTbgVql8nDJpwnrE27mub0.woff2',
        'client/fonts/aZMswpodYeVhtRvuABJWvBTbgVql8nDJpwnrE27mub0.woff2',
        'client/fonts/VvXUGKZXbHtX_S_VCTLpGhTbgVql8nDJpwnrE27mub0.woff2',
        'client/fonts/e7MeVAyvogMqFwwl61PKhBTbgVql8nDJpwnrE27mub0.woff2',
        'client/fonts/2tsd397wLxj96qwHyNIkxPesZW2xOQ-xsNqO47m55DA.woff2',
        'client/fonts/ZLqKeelYbATG60EpZBSDyxJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/oHi30kwQWvpCWqAhzHcCSBJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/rGvHdJnr2l75qb0YND9NyBJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/mx9Uck6uB63VIKFYnEMXrRJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/mbmhprMH69Zi6eEPBYVFhRJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/oOeFwZNlrTefzLYmlVV1UBJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2',
        'client/fonts/77FXFjRbGzN4aCrSFhlh3hJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/isZ-wbCXNKAbnjo6_TwHThJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/UX6i4JxQDm3fVTc1CPuwqhJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/jSN2CGVDbcVyCnfJfjSdfBJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/PwZc-YbIL414wB9rB1IAPRJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/97uahxiqZRoncBaCEI3aWxJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2',
        'client/fonts/s7gftie1JANC-QmDJvMWZhJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/WeQRRE07FDkIrr29oHQgHBJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/jyIYROCkJM3gZ4KV00YXOBJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/phsu-QZXz1JBv0PbFoPmEBJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/9_7S_tWeGDh5Pq3u05RVkhJtnKITppOI_IvcXXDNrsc.woff2',
        'client/fonts/mnpfi9pxYH-Go5UiibESIltXRa8TVwTICgirnJhmVJw.woff2',
        'client/fonts/1DbO0RvWEevroPvEzA5briEAvth_LlrfE80CYdSH47w.woff2',
        'client/fonts/5z9jpDJQqVE5bmkRqplJfiEAvth_LlrfE80CYdSH47w.woff2',
        'client/fonts/cueeGLWq_s1uoQgOf76TFiEAvth_LlrfE80CYdSH47w.woff2',
        'client/fonts/yTs8gw1HdasCzJ-B_iUwzSEAvth_LlrfE80CYdSH47w.woff2',
        'client/fonts/gLfmBATgABwy0zMVv-qqhiEAvth_LlrfE80CYdSH47w.woff2',
        'client/fonts/dzxs_VxZUhdM2mEBkNa8siEAvth_LlrfE80CYdSH47w.woff2',
        'client/fonts/12mE4jfMSBTmg-81EiS-Yfk_vArhqVIZ0nv9q090hN8.woff2',
        'client/fonts/7m8l7TlFO-S3VkhHuR0atzTOQ_MqJVwkKsUn0wKzc2I.woff2',
        'client/fonts/7m8l7TlFO-S3VkhHuR0atzUj_cnvWIuuBMVgbX098Mw.woff2',
        'client/fonts/7m8l7TlFO-S3VkhHuR0at0bcKLIaa1LC45dFaAfauRA.woff2',
        'client/fonts/7m8l7TlFO-S3VkhHuR0at2o_sUJ8uO4YLWRInS22T3Y.woff2',
        'client/fonts/7m8l7TlFO-S3VkhHuR0at76up8jxqWt8HVA3mDhkV_0.woff2',
        'client/fonts/7m8l7TlFO-S3VkhHuR0atyYE0-AqJ3nfInTTiDXDjU4.woff2',
        'client/fonts/7m8l7TlFO-S3VkhHuR0at44P5ICox8Kq3LLUNMylGO4.woff2',
        'client/fonts/WxrXJa0C3KdtC7lMafG4dRTbgVql8nDJpwnrE27mub0.woff2',
        'client/fonts/OpXUqTo0UgQQhGj_SFdLWBTbgVql8nDJpwnrE27mub0.woff2',
        'client/fonts/1hZf02POANh32k2VkgEoUBTbgVql8nDJpwnrE27mub0.woff2',
        'client/fonts/cDKhRaXnQTOVbaoxwdOr9xTbgVql8nDJpwnrE27mub0.woff2',
        'client/fonts/K23cxWVTrIFD6DJsEVi07RTbgVql8nDJpwnrE27mub0.woff2',
        'client/fonts/vSzulfKSK0LLjjfeaxcREhTbgVql8nDJpwnrE27mub0.woff2',
        'client/fonts/vPcynSL0qHq_6dX7lKVByfesZW2xOQ-xsNqO47m55DA.woff2',
        'client/fonts/OLffGBTaF0XFOW1gnuHF0TTOQ_MqJVwkKsUn0wKzc2I.woff2',
        'client/fonts/OLffGBTaF0XFOW1gnuHF0TUj_cnvWIuuBMVgbX098Mw.woff2',
        'client/fonts/OLffGBTaF0XFOW1gnuHF0UbcKLIaa1LC45dFaAfauRA.woff2',
        'client/fonts/OLffGBTaF0XFOW1gnuHF0Wo_sUJ8uO4YLWRInS22T3Y.woff2',
        'client/fonts/OLffGBTaF0XFOW1gnuHF0b6up8jxqWt8HVA3mDhkV_0.woff2',
        'client/fonts/OLffGBTaF0XFOW1gnuHF0SYE0-AqJ3nfInTTiDXDjU4.woff2',
        'client/fonts/OLffGBTaF0XFOW1gnuHF0Y4P5ICox8Kq3LLUNMylGO4.woff2',
        'client/fonts/t6Nd4cfPRhZP44Q5QAjcCzTOQ_MqJVwkKsUn0wKzc2I.woff2',
        'client/fonts/t6Nd4cfPRhZP44Q5QAjcCzUj_cnvWIuuBMVgbX098Mw.woff2',
        'client/fonts/t6Nd4cfPRhZP44Q5QAjcC0bcKLIaa1LC45dFaAfauRA.woff2',
        'client/fonts/t6Nd4cfPRhZP44Q5QAjcC2o_sUJ8uO4YLWRInS22T3Y.woff2',
        'client/fonts/t6Nd4cfPRhZP44Q5QAjcC76up8jxqWt8HVA3mDhkV_0.woff2',
        'client/fonts/t6Nd4cfPRhZP44Q5QAjcCyYE0-AqJ3nfInTTiDXDjU4.woff2',
        'client/fonts/t6Nd4cfPRhZP44Q5QAjcC44P5ICox8Kq3LLUNMylGO4.woff2',
        'client/fonts/bmC0pGMXrhphrZJmniIZpTTOQ_MqJVwkKsUn0wKzc2I.woff2',
        'client/fonts/bmC0pGMXrhphrZJmniIZpTUj_cnvWIuuBMVgbX098Mw.woff2',
        'client/fonts/bmC0pGMXrhphrZJmniIZpUbcKLIaa1LC45dFaAfauRA.woff2',
        'client/fonts/bmC0pGMXrhphrZJmniIZpWo_sUJ8uO4YLWRInS22T3Y.woff2',
        'client/fonts/bmC0pGMXrhphrZJmniIZpb6up8jxqWt8HVA3mDhkV_0.woff2',
        'client/fonts/bmC0pGMXrhphrZJmniIZpSYE0-AqJ3nfInTTiDXDjU4.woff2',
        'client/fonts/bmC0pGMXrhphrZJmniIZpY4P5ICox8Kq3LLUNMylGO4.woff2',
        'client/fonts/materialdesignicons-webfont.eot',
        'client/fonts/materialdesignicons-webfont.woff',
        'client/fonts/materialdesignicons-webfont.woff2',
        'client/fonts/materialdesignicons-webfont.ttf',
        'client/fonts/materialdesignicons-webfont.svg',
    ], ["client"]);
});

// Package.onTest(function(api) {
//     api.use('ecmascript');
//     api.use('tinytest');
//     api.use('viu-ui');
//     api.mainModule('viu-ui-tests.js');
// });
