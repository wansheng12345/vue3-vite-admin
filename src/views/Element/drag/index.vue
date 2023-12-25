<template>
	<div class="drag-page">
		<section>
			<div class="row-item">
				<h3>基于原生的拖拽</h3>
				<div class="row">
					<div class="left-drag">
						<TransitionGroup name="list" tag="div" class="container">
							<div class="item" v-for="(item, i) in drag.list" :key="item.id" draggable="true"
								@dragstart="dragstart($event, i)" @dragenter="dragenter($event, i)" @dragend="dragend"
								@dragover="dragover">
								{{ item.name }}
							</div>
						</TransitionGroup>
					</div>
					<div class="right-list">
						<ul>
							<li v-for="(v,i) in drag.list" :key='v.id'>
								{{v}}
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="row-item">
				<h3>基于vuedraggable.js的拖拽</h3>
				<div class="row">
					<div class="left-drag">
						<draggable :list="drag.list2" item-key="5" :force-fallback="true" chosen-class="chosen"
							ghost-class="ghost" animation="1000" @start="onStart" @end="onEnd">
							<template #item="{ element, index }" class="scroll-box">
								<ul class="draggable-ul">
									<li>{{element.name}}</li>
								</ul>
							</template>
						</draggable>
					</div>
					<div class="right-list">
						<ul class="draggable-ul">
							<li v-for="(v,i) in drag.list2" :key='v.id'>
								{{v}}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	import draggable from "vuedraggable";

	const drag = reactive({
		list: [{
				name: 'a',
				id: 1
			},
			{
				name: 'b',
				id: 2
			},
			{
				name: 'c',
				id: 3
			},
			{
				name: 'd',
				id: 4
			},
			{
				name: 'e',
				id: 5
			},
		],
		list2: [{
				name: 'a',
				id: 1
			},
			{
				name: 'b',
				id: 2
			},
			{
				name: 'c',
				id: 3
			},
			{
				name: 'd',
				id: 4
			},
			{
				name: 'e',
				id: 5
			},
		]
	})
	let dragIndex = 0

	function dragstart(e, index) {
		e.stopPropagation()
		dragIndex = index
	}

	function dragenter(e, index) {
		e.preventDefault()
		// 拖拽到原位置时不触发
		if (dragIndex !== index) {
			const source = drag.list[dragIndex];
			drag.list.splice(dragIndex, 1);
			drag.list.splice(index, 0, source);
			// 更新节点位置
			dragIndex = index
		}
	}

	function dragover(e) {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'move'
	}

	function dragend(e) {
		console.log('拖拽结束 -- list', drag.list);
	}
	// vuedraggable
	function onStart() {

	}

	function onEnd() {

	}
</script>

<style scoped lang="scss">
	.drag-page {
		padding: 20px 15px;

		section {
			display: flex;

			.draggable-ul {
				li {
					width: 200px;
					height: 40px;
					line-height: 40px;
					// background-color: #f5f6f8;
					background-color: skyblue;
					text-align: center;
					margin: 10px;
					color: #fff;
					font-size: 19px;
					cursor: move;
				}
			}

			.right-list {
				.draggable-ul {
					li {
						background-color: #fff;
						color: #333;
						cursor: default;
					}
				}
			}
		}

		.row {
			display: flex;
			margin-right: 20px;

			.left-drag {
				.container {
					position: relative;
					padding: 0;

					.item {
						width: 200px;
						height: 40px;
						line-height: 40px;
						// background-color: #f5f6f8;
						background-color: skyblue;
						text-align: center;
						margin: 10px;
						color: #fff;
						font-size: 19px;
						cursor: move;
					}
				}
			}

			.right-list {
				ul {
					li {

						line-height: 40px;
						margin: 10px;
						font-size: 18px;
					}
				}
			}
		}

		// .moveing {
		// 	opacity: 0;
		// }

		.list-move,
		/* 对移动中的元素应用的过渡 */
		.list-enter-active,
		.list-leave-active {
			transition: all 0.2s ease;
		}
	}
</style>