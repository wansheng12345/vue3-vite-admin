export default {
  beforeMount(el, binding, vnode) {
    const handleInput = (e) => {
      if (vnode.locking) {
        return;//解决中文输入双向绑定失效
      }
      let type = binding.arg;
      let value = e.target.value;
      switch (type) {
        case 'int':
          value = value.replace(/[^0-9]/g, '');
          break;
        case 'float':
          value = value.replace(/[^0-9.]/g, '').replace(/^\.+/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2})./g, '$1');
          break;
        case 'negative':
          value = value.replace(/[^0-9.-]/g, '').replace(/(?!^)-/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2})./g, '$1');
          break;
      }
      e.target.value = value;
      e.target.dispatchEvent(new Event('input'));
    }

    const handleCompositionStart = (e) => {
      vnode.locking = true
      handleInput(e);
    }

    const handleCompositionEnd = (e) => {
      vnode.locking = false
      handleInput(e);
    }

    el.inputHandler = handleInput;
    el.compositionStartHandler = handleCompositionStart;
    el.compositionEndHandler = handleCompositionEnd;

    el.addEventListener('input', handleInput);
    el.addEventListener('compositionstart', handleCompositionStart);
    el.addEventListener('compositionend', handleCompositionEnd);
  },
  beforeUnmount(el) {
    el.removeEventListener('input', el.inputHandler);
    el.removeEventListener('compositionstart', el.compositionStartHandler);
    el.removeEventListener('compositionend', el.compositionEndHandler);
  },
}