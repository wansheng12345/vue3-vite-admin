<template>
	<div>
		<!-- 边框效果 -->
		<ul class="button-ul">
			<li class="btn btn-1">
				<span>Border</span>
			</li>
			<li class="btn btn-2">
				<span>Border</span>
			</li>
			<li class="btn btn-3">
				<span>Border</span>
			</li>
			<li class="btn btn-4">
				<span>Border</span>
			</li>
			<li class="btn btn-5">
				<span>Border</span>
			</li>
		</ul>
		<!-- 通过渐变背景 -->
		<h2 class="title">
			<h4>通过渐变背景实现(多行)</h4>
			<span>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit et facilis sapiente vel? Suscipit eius
				commodi saepe soluta voluptatem esse. Saepe necessitatibus nobis inventore neque tempora ex, corporis
				atque dolor?
			</span>
		</h2>
		<!-- 伪类 -->
		<div class="titel-h3">
			<h4>通过伪类实现(单行)</h4>
			<span>
				quos eum natus, ab sint aut dolorum eaque in assumenda. Similique commodi fuga eos.
			</span>
		</div>
		<div class="bgimg">
			<ul>
				<li>
					<!-- <img src="@/assets/images/3.jpg" alt=""> -->
					<div class="content">
						<h2 class="title">Mountain View</h2>
						<p>Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the
							mountains</p>
						<button>View Trips</button>
					</div>
				</li>
				<li>
					<div class="content">
						<h2 class="title">Mountain View</h2>
						<p>Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the
							mountains</p>
						<button>View Trips</button>
					</div>
				</li>
				<li>
					<div class="content">
						<h2 class="title">Mountain View</h2>
						<p>Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the
							mountains</p>
						<button>View Trips</button>
					</div>
				</li>
				<li>
					<div class="content">
						<h2 class="title">Mountain View</h2>
						<p>Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the
							mountains</p>
						<button>View Trips</button>
					</div>
				</li>
				<li>
					<div class="content">
						<h2 class="title">Mountain View</h2>
						<p>Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the
							mountains</p>
						<button>View Trips</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	h4 {
		margin: 10px 0;
	}

	.title {
		color: #333;
		line-height: 30px;
		font-size: 18px;
		color: #666;
		cursor: pointer;
		padding: 0 20px;

		span {
			background: linear-gradient(to right, #ec695c, #61c454) no-repeat right bottom;
			background-size: 0 2px;
			transition: background-size 500ms;

			&:hover {
				background-position-x: left;
				background-size: 100% 3px;
			}
		}
	}

	.titel-h3 {
		color: #333;
		line-height: 30px;
		font-size: 18px;
		color: #666;
		cursor: pointer;
		padding: 0 20px;

		span {
			position: relative;

			&::after {
				content: "";
				position: absolute;
				width: 98%;
				height: 3px;
				bottom: 0;
				left: 0;
				transform: scaleX(0);
				background-color: #a862ea;
				transform-origin: bottom right;
				transition: transform .3s ease-in-out;
			}

			&:hover::after {
				transform: scaleX(1);
				transform-origin: bottom left;
			}
		}
	}

	.bgimg {
		ul {
			display: flex;
			width: 95%;
			height: 450px;
			margin: 20px auto;

			&>li {
				flex: 1;
				border-radius: 10px;
				margin: 0 10px;
				transition: all .3s cubic-bezier(.25, .4, .45, 1.4);
				position: relative;
				cursor: pointer;
				overflow: hidden;

				&:before {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-image: url('@/assets/images/3.jpg');
					background-position: center;
					background-repeat: no-repeat;
					background-size: auto 100%;
					filter: grayscale(1);
				}


				&:hover {
					&::before {
						filter: grayscale(0);
					}

					.content {
						padding: 30px 0;
						transform: translateY(200px);
					}
				}

				&:nth-child(2):before {
					background-image: url('@/assets/images/4.jpg');
				}

				&:nth-child(3):before {
					background-image: url('@/assets/images/5.jpg');
				}

				&:nth-child(4):before {
					background-image: url('@/assets/images/6.jpg');
				}

				&:nth-child(5):before {
					background-image: url('@/assets/images/7.jpg');
				}

				.content {
					text-align: center;
					color: #f5f5f5;
					transition: all 0.2s ease-out;
					margin: 0 auto;
					transform: translateY(410px);

					h2 {
						font-size: 1.3rem;
						font-weight: bold;
						line-height: 1.2;
						margin-bottom: 15px;
						color: #f5f5f5;
					}

					p {
						font-family: "Cardo", serif;
						font-size: 1.125rem;
						font-style: italic;
						line-height: 1.2;
					}

					button {
						border: none;
						outline: none;
						line-height: 32px;
						margin-top: 20px;
						border-radius: 2px;
						background: #a862ea;
						color: #f5f5f5;
						padding: 0 20px;
						cursor: pointer;
					}
				}
			}
		}



	}

	::before,
	::after {
		position: absolute;
		content: "";
	}

	ul.button-ul {
		display: flex;
		align-items: center;
		padding: 10px 30px;
	}

	.btn {
		position: relative;
		display: inline-block;
		background-color: transparent;
		cursor: pointer;
		min-width: 130px;
		margin-right: 30px;

		span {
			position: relative;
			display: inline-block;
			font-size: 14px;
			top: 0;
			left: 0;
			width: 100%;
			padding: 10px 20px;
			transition: all 0.3s;
			text-align: center;
		}
	}

	.btn-1 {

		span {
			border: 1px solid #1c1f1e;
			color: #1c1f1e;
			transition: 0.2s 0.1s;

			&:hover {
				color: #fff;
				transition: 0.2s 0.1s;
			}
		}

		&::before {
			background-color: #1c1f1e;
			transition: 0.3s ease-out;
			top: 0;
			bottom: 0;
			left: 0;
			height: 100%;
			width: 0%;
		}

		&:hover::before {
			width: 100%;
		}
	}

	.btn-2 {
		span {
			border: 1px solid #1c1f1e;
			color: #1c1f1e;
			transition: 0.2s;

			&:hover {
				color: #fff;
				transition: 0.2s 0.1s;
			}
		}

		&::before {
			top: 0;
			left: 0;
			right: 0;
			height: 0%;
			width: 100%;
			background-color: #1c1f1e;
			transition: 0.3s ease-out;
		}

		&:hover::before {
			height: 100%;
		}
	}

	.btn-3 {

		&::before,
		&::after {
			width: 25%;
			height: 2px;
			background-color: rgb(54, 56, 55);
			z-index: 2;
			bottom: 0;
			transition: width 0.1s 0.3s ease-out;
		}

		span {
			color: rgb(28, 31, 30);
			background-color: rgb(245, 245, 245);

			&:hover {
				color: rgb(54, 56, 55);

				&::before,
				&::after {
					width: 50%;
					height: 96%;
					opacity: 1;
					transition: height 0.2s 0.2s ease-in, width 0.2s 0.4s linear, opacity 0s 0.2s;
				}
			}

			&::before,
			&::after {
				width: 0%;
				height: 0%;
				background: transparent;
				opacity: 0;
				z-index: 2;
				transition: width 0.2s ease-in, height 0.15s 0.2s linear, opacity 0s 0.35s;
			}

			&::before {
				bottom: 0;
				left: 0;
				border-left: 2px solid rgb(54, 56, 55);
				border-top: 2px solid rgb(54, 56, 55);
			}

			&::after {
				bottom: 0;
				right: 0;
				border-right: 2px solid rgb(54, 56, 55);
				border-top: 2px solid rgb(54, 56, 55);
			}
		}

		&:hover {

			&::before,
			&::after {
				width: 50%;
				transition: width 0.2s ease-in;
			}
		}

		&::before {
			right: 50%;
		}

		&::after {
			left: 50%;
		}
	}

	.btn-4 {
		color: #fff;
		border-radius: 5px;
		font-family: 'Lato', sans-serif;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		display: inline-block;
		box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
			7px 7px 20px 0px rgba(0, 0, 0, .1),
			4px 4px 5px 0px rgba(0, 0, 0, .1);
		outline: none;
		background: linear-gradient(0deg, rgba(96, 9, 240, 1) 0%, rgba(129, 5, 240, 1) 100%);
		border: none;

		span {
			padding: 10px 20px
		}

		&:before {
			height: 0%;
			width: 2px;
		}

		&:hover {
			box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .5),
				-4px -4px 6px 0 rgba(116, 125, 136, .5),
				inset -4px -4px 6px 0 rgba(255, 255, 255, .2),
				inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
		}
	}

	.btn-5 {
		transition: all 0.3s ease;
		position: relative;
		background: #eee;
		color: #333;
		cursor: pointer;

		&::after {
			position: absolute;
			background-color: #1c1f1e;
			transition: 0.3s ease-out;
			bottom: 0;
			left: 0;
			height: 1px;
			width: 0%;
		}

		&:hover {
			&::after {
				width: 100%;
			}
		}
	}
</style>