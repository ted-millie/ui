export default class Zoom {
  constructor (canvas) {
    this.nodes = {
      canvas
    }

    this._camera = {
      x: 0,
      y: 0,
      z: 1
    }

    this.init()
  }

  get camera () {
    return this._camera
  }

  set camera (camera) {
    this._camera = camera
    this.updateScreen()
  }

  init () {
    this.initRender()
    this.initEvents()
  }

  initRender () {
    this.nodes.camera = document.createElement('div')

    const childNodes = [...this.nodes.canvas.childNodes]
    childNodes.forEach(child => this.nodes.camera.appendChild(child))

    this.nodes.canvas.appendChild(this.nodes.camera)
  }

  initEvents () {
    this.nodes.canvas.addEventListener('wheel', this.onWheel.bind(this), { passive: false })
  }

  onWheel (event) {
    event.preventDefault()

    const { clientX, clientY, deltaX, deltaY, ctrlKey } = event

    if (ctrlKey) {
      this.zoomCamera({ clientX, clientY }, deltaY / 100)
    } else {
      this.panCamera(deltaX, deltaY)
    }
  }

  panCamera (deltaX, deltaY) {
    const camera = this.camera
    this.camera = {
      x: camera.x - deltaX / camera.z,
      y: camera.y - deltaY / camera.z,
      z: camera.z
    }
  }

  zoomCamera (point, deltaZ) {
    
  }

  updateScreen () {
    const camera = this.camera

    this.nodes.camera.style.transform = `translate(${camera.x}px, ${camera.y}px) scale(${camera.z})`
  }
}