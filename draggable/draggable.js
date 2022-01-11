;(function () {

  'use strict'

  const nodes = {
    experimentRoot: document.getElementById('experimentRoot'),
    experimentHeader: document.getElementById('experimentHeader')
  }

  let mouseX = 0
  let mouseY = 0

  let elementX = 0
  let elementY = 0

  let translateX = 0
  let translateY = 0

  let velX = 0
  let velY = 0

  let isDown = false

  function init () {
    initEvents()
  }

  function initEvents () {
    nodes.experimentHeader.addEventListener('pointerdown', onPointerDown)    

    document.addEventListener('dragover', event => event.preventDefault())
  }

  function onPointerDown (event) {
    isDown = true
    mouseX = event.clientX
    mouseY = event.clientY

    nodes.experimentHeader.setPointerCapture(event.pointerId)
    nodes.experimentHeader.addEventListener('pointermove', onPointerMove)
    nodes.experimentHeader.addEventListener('pointerup', onPointerUp)
    nodes.experimentHeader.addEventListener('pointerout', onPointerUp)
    // pointerup pointercancel pointerout pointerleave
  }

  function onPointerMove (event) {
    const deltaX = event.clientX - mouseX
    const deltaY = event.clientY - mouseY
    const prevTranslateX = translateX
    const prevTranslateY = translateY
    translateX = elementX + deltaX
    translateY = elementY + deltaY
    velX = translateX - prevTranslateX
    velY = translateY - prevTranslateY

    move(translateX, translateY)
  }

  function onPointerUp (event) {
    if (!isDown) {
      return
    }

    isDown = false
    elementX = translateX
    elementY = translateY

    momentum()

    nodes.experimentHeader.releasePointerCapture(event.pointerId)
    nodes.experimentHeader.removeEventListener('pointermove', onPointerMove)
    nodes.experimentHeader.removeEventListener('pointerup', onPointerUp)
    nodes.experimentHeader.removeEventListener('pointerout', onPointerUp)
  }

  function momentum () {
    translateX += velX
    translateY += velY
    elementX = translateX
    elementY = translateY
    velX *= 0.95
    velY *= 0.95

    move(translateX, translateY)

    if (Math.abs(velX) > 0.5 || Math.abs(velY) > 0.5) {
      requestAnimationFrame(momentum)
    }
  }

  function move (x, y) {
    nodes.experimentRoot.style.transform = `translate(${x}px, ${y}px)`
  }

  init()
})()