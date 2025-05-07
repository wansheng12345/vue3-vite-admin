import {
	ElMessage
} from 'element-plus';
export default {
	mounted(el, binding) {
		el.addEventListener('click', async () => {
			try {
				if (navigator.clipboard && navigator.clipboard.writeText) {
					// 使用 Clipboard API 复制内容
					await navigator.clipboard.writeText(binding.value);
				} else {
					// 回退到使用临时 textarea 的方式
					const textarea = document.createElement('textarea');
					textarea.value = binding.value;
					document.body.appendChild(textarea);
					textarea.select();
					document.execCommand('copy');
					document.body.removeChild(textarea);
				}
				ElMessage.success('复制成功');
			} catch (err) {
				console.error('复制失败:', err);
			}
		});
	}
}