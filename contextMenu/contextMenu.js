export default class ContextMenu {
  constructor (stage, template) {
    this.nodes = { stage }
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
    this._initMenubar()
  }

  _initEvents () {
    this.nodes.stage.addEventListener('contextmenu', this.open.bind(this))
    this.nodes.container.addEventListener('click', this.close.bind(this))

    const menuItems = [...this.nodes.container.querySelectorAll('[role="menuitem"]')]
    menuItems.forEach(menuitem => {
      menuitem.addEventListener('mouseenter', (event) => {
        const menu = menuitem.querySelector('[role="menu"]')
        if (!menu) {
          return
        }

        console.log(menu)
      })
    })
  }

  _initContainer () {
    this.nodes.container = document.createElement('div')
    this.nodes.container.classList.add('contextmenu')
  }

  _initMenubar () {
    this.nodes.menubar = this._createContextMenu(this.template)

    this.nodes.container.appendChild(this.nodes.menubar)
  }

  _createContextMenu (items) {
    const menu = document.createElement('div')
    menu.setAttribute('role', 'menu')

    for (const item of items) {
      const menuitem = document.createElement('div')
      menuitem.setAttribute('role', item.role || 'menuitem')

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
    const largestWidth = this.nodes.stage.offsetWidth - this.nodes.menubar.offsetWidth - 16
    const largestHeight = this.nodes.stage.offsetHeight - this.nodes.menubar.offsetHeight - 16

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

    this.nodes.stage.appendChild(this.nodes.container)
    this.nodes.stage.offsetHeight

    const position = this._getPosition(event.clientX, event.clientY)
    this.nodes.menubar.style.left = `${position.left}px`
    this.nodes.menubar.style.top = `${position.top}px`
    this.nodes.menubar.focus()

    this.isOpen = true
  }  

  close (event) {
    if (!this.isOpen) {
      return
    }

    this.nodes.stage.removeChild(this.nodes.container)

    this.isOpen = false
  }
}