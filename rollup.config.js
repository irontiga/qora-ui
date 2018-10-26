import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'

export default [
    // {
    //     input: 'src/elements/main-app/main-app.js',
    //     output: [
    //         {
    //             file: 'src/elements/main-app/main-app-bundle.js',
    //             format: 'iife'
    //         }
    //     ],
    //     plugins: [
    //         resolve(),
    //         commonjs(),
    //         babel(),
    //         uglify()
    //     ]
    // },
    // {
    //     input: 'plugins/pluginLoader.js',
    //     output: {
    //         file: 'plugins/pluginLoaderBundle.js',
    //         format: 'iife',
    //         name: ''
    //     },
    //     plugins: [
    //         babel(),
    //         uglify()
    //     ]
    // },
    // {
    //     input: 'src/elements/login-screen/login-screen.js',
    //     output: {
    //         file: 'src/elements/login-screen/login-screen-bundle.js',
    //         format: 'iife',
    //         name: ''
    //     },
    //     plugins: [
    //         babel(),
    //         uglify()
    //     ]
    // },
    // {
    //     input: 'src/elements/login-screen/login-page/login-page.js',
    //     output: {
    //         file: 'src/elements/login-screen/login-page/login-page-bundle.js',
    //         format: 'iife',
    //         name: ''
    //     },
    //     plugins: [
    //         babel(),
    //         uglify()
    //     ]
    // },
    // {
    //     input: 'src/elements/login-screen/create-account-page/create-account-page.js',
    //     output: {
    //         file: 'src/elements/login-screen/create-account-page/create-account-page-bundle.js',
    //         format: 'iife',
    //         name: ''
    //     },
    //     plugins: [
    //         babel(),
    //         uglify()
    //     ]
    // },
    // {
    //     input: 'src/elements/login-screen/login-handler/login-handler.js',
    //     output: {
    //         file: 'src/elements/login-screen/login-handler/login-handler-bundle.js',
    //         format: 'iife',
    //         name: '',
    //         // globals: {
    //         //     crypto: {},
    //         //     msCrypto: {},
    //         //     dcodeIO: void 0
    //         // },
    //     },
    //     plugins: [
    //         resolve({ 
    //             browser: true,
    //             jsnext: true,
    //             main: true,
    //             module: true
    //         }),
    //         commonjs({
    //             // ignoreGlobal: true,  
    //             namedExports: {
    //                 'bcryptjs': ['default']
    //             }
    //         }),
    //         babel({
    //             exclude: '',
    //             include:'node_modules/**'
    //         }),
    //         // uglify()
    //     ]
    // },
    {
        input: 'plugins/core/main-src.js',
        output: {
            file: 'plugins/core/main.js',
            format: 'iife',
            name: ''
        },
        plugins: [babel(), uglify()]
    },
    {
        input: 'plugins/airdrop/airdrop-app.js',
        output: {
            file: 'plugins/airdrop/airdrop-app-bundle.js',
            format: 'iife',
            name: ''
        },
        plugins: [commonjs(), babel(), uglify()]
    },
    {
        input: 'plugins/core/send-money-page/send-money-page.js',
        output: {
            file: 'plugins/core/send-money-page/send-money-page-bundle.js',
            format: 'iife',
            name: ''
        },
        plugins: [
            resolve({
                browser: true,
                jsnext: true,
                main:true
            }),
            commonjs(),
            builtins(),
            babel(),
            uglify()
        ]
    }
]