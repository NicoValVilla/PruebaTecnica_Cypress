// Laboratorio 5.1, actividades 2 y 3 (tabla de decisión del Log in y transición de estados de la sesión)
// Va en Ejercicio_1/cypress/e2e/ y se corre con:
//   npx cypress run --spec cypress/e2e/sesion_login.cy.js
// Las capturas quedan en Ejercicio_1/cypress/screenshots/sesion_login.cy.js/
// El mensaje real de cada alerta queda en el log de Cypress y en el video.
//
// v2 del script: en la primera corrida el Sign up solo alcanzó a escribir "nva" porque la página
// seguía cargando, se registró otro usuario y por eso los logins dieron "User does not exist.".
// Ahora espera a que cargue la página y a que abra la ventana, escribe más despacio
// y revisa que el campo quedó con el texto completo antes de dar clic.

const USUARIO = 'nvaldivia_lab51'
const CLAVE = 'Lab51*Prueba'          // contraseña de prueba solo para DemoBlaze
const NO_EXISTE = 'nvaldivia_noexiste_999'

function escribir(selector, texto) {
  cy.get(selector).should('be.visible').clear()
  cy.get(selector).type(texto, { delay: 40 })
  cy.get(selector).should('have.value', texto)
}

function abrirVentana(link, modal) {
  cy.get(link).should('be.visible').click()
  cy.get(modal).should('have.class', 'show').and('be.visible')
  cy.wait(500) // deja terminar la animación de la ventana
}

function login(usuario, clave) {
  abrirVentana('#login2', '#logInModal')
  escribir('#loginusername', usuario)
  escribir('#loginpassword', clave)
  cy.get('#logInModal .btn-primary').click()
}

function registrarAlerta(alerta, caso) {
  cy.wrap(alerta).should('have.been.called').then((s) => {
    cy.log(`${caso} -> alerta: ${s.lastCall.args[0]}`)
  })
}

describe('Act 2 y 3 · Log in y sesión en DemoBlaze', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.visit('/')
    // espera a que carguen los productos para que la página no interrumpa lo que se escribe
    cy.get('#tbodyid .card', { timeout: 15000 }).should('have.length.greaterThan', 0)
  })

  it('CP-T1 Sign up deja el usuario creado y sigue sin sesión', () => {
    const alerta = cy.stub()
    cy.on('window:alert', alerta)
    abrirVentana('#signin2', '#signInModal')
    escribir('#sign-username', USUARIO)
    escribir('#sign-password', CLAVE)
    cy.get('#signInModal .btn-primary').click()
    // Si ya se creó en otra corrida sale "This user already exist." y también sirve
    cy.wrap(alerta).should('have.been.calledWithMatch', /Sign up successful|This user already exist/)
    registrarAlerta(alerta, 'CP-T1')
    cy.get('#nameofuser').should('not.be.visible')
    cy.get('#login2').should('be.visible')
    cy.screenshot('CP-T1_signup_sin_sesion')
  })

  it('CP-D1 y CP-T2 Log in correcto pasa a con sesión (T6 y T7 inválidas)', () => {
    login(USUARIO, CLAVE)
    cy.get('#nameofuser').should('be.visible').and('contain', `Welcome ${USUARIO}`)
    cy.get('#logout2').should('be.visible')
    // T6 y T7, con sesión no deberían estar Log in ni Sign up
    cy.get('#login2').should('not.be.visible')
    cy.get('#signin2').should('not.be.visible')
    cy.screenshot('CP-D1_CP-T2_con_sesion_T6_T7')
  })

  it('CP-T3 Log out vuelve a sin sesión', () => {
    login(USUARIO, CLAVE)
    cy.get('#logout2').should('be.visible').click()
    cy.get('#login2').should('be.visible')
    cy.get('#signin2').should('be.visible')
    cy.get('#nameofuser').should('not.be.visible')
    cy.screenshot('CP-T3_logout_sin_sesion')
  })

  it('CP-D2 y CP-T4 contraseña incorrecta', () => {
    const alerta = cy.stub()
    cy.on('window:alert', alerta)
    login(USUARIO, 'ClaveEquivocada1')
    cy.wrap(alerta).should('have.been.calledWithMatch', 'Wrong password.')
    registrarAlerta(alerta, 'CP-D2')
    cy.get('#nameofuser').should('not.be.visible')
    cy.screenshot('CP-D2_CP-T4_wrong_password')
  })

  it('CP-D4 usuario que no existe', () => {
    const alerta = cy.stub()
    cy.on('window:alert', alerta)
    login(NO_EXISTE, CLAVE)
    cy.wrap(alerta).should('have.been.calledWithMatch', 'User does not exist.')
    registrarAlerta(alerta, 'CP-D4')
    cy.screenshot('CP-D4_user_does_not_exist')
  })
})