import { defineConfig } from 'eslint/config';
import expoConfig from 'eslint-config-expo/flat';

export default defineConfig([
    expoConfig,
    {
        plugins: ['prettier'],
        rules: {
            'prettier/prettier': 'error'
        },
        env: {
            browser: true,
            node: true,
            es2021: true
        }
    }
]);

