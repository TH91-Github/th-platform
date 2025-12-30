import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'), // 절대경로 지정해 맞추기
		},
	},
	server: {
		port: 5174, // 초기 5173
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@use "@/assets/style/common/_variables.scss" as *;
					@use "@/assets/style/common/_mixins.scss" as *;
					@use "@/assets/style/common/_function.scss" as *;
				`
			}
		},
	},
});
