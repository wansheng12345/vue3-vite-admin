<template>
	<div class="input-area">
		<input type="text" class="__input" required />
		<label for="" class="__tip">User Name</label>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.input-area {
		width: 593px;
		background: pink;
		height: 90px;
		display: flex;
		position: relative;
	}

	.__input {
		width: 80%;
		height: 33px;
		border: none;
		position: absolute;
		top: 30px;
		left: 50px;
		border-bottom: 1px solid #aaa;
	}

	.__input:valid~.__tip,
	.__input:focus~.__tip {
		transform: translateY(-30px);
	}

	.__input:focus {
		border: none;
		outline: none;
		border-bottom: 1px solid #aaa;
	}

	.__tip {
		position: absolute;
		left: 58px;
		top: 38px;
		pointer-events: none;
		transition: all 0.3s ease;
	}
</style>