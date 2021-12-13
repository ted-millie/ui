export default class ContextMenu {
  constructor (target, template) {
    this.nodes = { target }
    this.template = template

    this.isOpen = false

    this._init()
  }

  _init () {
    this._initRender()
    this._initEvents()
  }

  _initRender () {
    this._initContainer()
    this._initContextMenu()
  }

  _initEvents () {
    this.nodes.target.addEventListener('contextmenu', this.open.bind(this))
    this.nodes.container.addEventListener('click', this.close.bind(this))
  }

  _initContainer () {
    this.nodes.container = document.createElement('div')
    this.nodes.container.classList.add('contextmenu-container')
  }

  _initContextMenu () {
    this.nodes.contextMenu = this._createContextMenu(this.template)

    this.nodes.container.appendChild(this.nodes.contextMenu)
  }

  _createContextMenu (items) {
    const menu = document.createElement('div')
    menu.setAttribute('role', 'menu')

    for (const item of items) {
      const menuitem = document.createElement('div')
      menuitem.setAttribute('role', 'menuitem')

      if (item.role === 'separator') {
        menuitem.setAttribute('role', 'separator')
        menu.appendChild(menuitem)

        continue
      }

      if (item.label) {
        menuitem.innerHTML = item.label
      }

      if (item.on) {
        const entries = Object.entries(item.on)
        for (const [eventName, callback] of entries) {
          menuitem.addEventListener(eventName, callback)
        }
      }

      if (item.submenu) {
        const menu = this._createContextMenu(item.submenu)
        menuitem.appendChild(menu)
      }

      menu.appendChild(menuitem)
    }

    return menu
  }

  _getPosition (left, top) {
    const largestWidth = this.nodes.target.offsetWidth - this.nodes.contextMenu.offsetWidth - 16
    const largestHeight = this.nodes.target.offsetHeight - this.nodes.contextMenu.offsetHeight - 16

    if (left > largestWidth) {
      left = largestWidth
    }

    if (top > largestHeight) {
      top = largestHeight
    }

    return {
      left,
      top
    }
  }

  open (event) {
    event.preventDefault()

    this.nodes.target.appendChild(this.nodes.container)
    this.nodes.target.offsetHeight

    const position = this._getPosition(event.clientX, event.clientY)
    this.nodes.contextMenu.style.left = `${position.left}px`
    this.nodes.contextMenu.style.top = `${position.top}px`
    this.nodes.contextMenu.focus()

    this.isOpen = true
  }  

  close (event) {
    if (!this.isOpen) {
      return
    }

    this.nodes.target.removeChild(this.nodes.container)

    this.isOpen = false
  }
}