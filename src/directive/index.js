import hasRole from './permission/hasRole'
import hasPermi from './permission/hasPermi'
import copyText from './common/copyText'
import slideIn from './slide-in'
import LazyImg from './lazyLoad'
import Scroll from "./scroll-table"

export default function directive(app) {
	app.directive('hasRole', hasRole)
	app.directive('hasPermi', hasPermi)
	app.directive('copyText', copyText)
	app.directive('slide-in', slideIn)
	app.directive('lazy-img', LazyImg)
	app.directive('scroll', Scroll)
}