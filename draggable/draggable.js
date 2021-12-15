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

  function init () {
    initEvents()
  }

  function initEvents () {
    nodes.experimentHeader.addEventListener('pointerdown', onPointerDown)    

    document.addEventListener('dragover', event => event.preventDefault())
  }

  function onPointerDown (event) {
    mouseX = event.clientX
    mouseY = event.clientY

    nodes.experimentHeader.setPointerCapture(event.pointerId)
    nodes.experimentHeader.addEventListener('pointermove', onPointerMove)
    nodes.experimentHeader.addEventListener('pointerup', onPointerUp)
    nodes.experimentHeader.addEventListener('pointerout', onPointerUp)
  }

  function onPointerMove (event) {
    const deltaX = event.clientX - mouseX
    const deltaY = event.clientY - mouseY
    translateX = elementX + deltaX
    translateY = elementY + deltaY

    requestAnimationFrame(move)
  }

  function onPointerUp (event) {
    elementX = translateX
    elementY = translateY

    nodes.experimentHeader.releasePointerCapture(event.pointerId)
    nodes.experimentHeader.removeEventListener('pointermove', onPointerMove)
    nodes.experimentHeader.removeEventListener('pointerup', onPointerUp)
    nodes.experimentHeader.removeEventListener('pointerout', onPointerUp)
  }

  function move () {
    nodes.experimentRoot.style.transform = `translate(${translateX}px, ${translateY}px)`
  }

  init()
})()