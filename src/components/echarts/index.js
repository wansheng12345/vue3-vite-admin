// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";

/** 引入柱状图and折线图图表，图表后缀都为 Chart  */
import {
	BarChart,
	LineChart,
	PieChart,
	RadarChart,
	MapChart,
	EffectScatterChart,
	CustomChart,
	GraphChart,
	ScatterChart
} from "echarts/charts";

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	GeoComponent,
	LegendComponent,
	ToolboxComponent,
	DataZoomComponent,
	TimelineComponent,
	MarkLineComponent,
	GraphicComponent,
} from "echarts/components";

// 标签自动布局，全局过渡动画等特性
import {
	LabelLayout,
	UniversalTransition
} from "echarts/features";

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
	CanvasRenderer
} from "echarts/renderers";
// 注册必须的组件
echarts.use([
	BarChart,
	LineChart,
	PieChart,
	RadarChart,
	MapChart,
	GraphChart,
	EffectScatterChart,
	CustomChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
	GeoComponent,
	ToolboxComponent,
	DataZoomComponent,
	TimelineComponent,
	CanvasRenderer,
	MarkLineComponent,
	LabelLayout,
	UniversalTransition,
	GraphicComponent,
	ScatterChart
]);

// 导出
export default echarts;