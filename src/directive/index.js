import hasRole from './permission/hasRole'
import hasPermi from './permission/hasPermi'
import Copy from './Copy'
import slideIn from './slide-in'
import LazyImg from './lazyLoad'
import Scroll from "./scroll-table"
import debounce from './debounce'

export default function directive(app) {
	app.directive('hasRole', hasRole)
	app.directive('hasPermi', hasPermi)
	app.directive('Copy', Copy)
	app.directive('slide-in', slideIn)
	app.directive('lazy-img', LazyImg)
	app.directive('scroll', Scroll)
	app.directive('debounce', debounce)
}