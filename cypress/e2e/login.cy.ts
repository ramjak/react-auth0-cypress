/* eslint-disable camelcase */
describe("login", () => {
  it("should successfully log into our app", () => {
    cy.loginAsUser()
      .then((resp) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return resp.body;
      })
      .then((body) => {
        const { access_token, expires_in, id_token } = body;
        const auth0State = {
          nonce: "",
          state: "some-random-state",
        };
        const callbackUrl = `/callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
        cy.visit(callbackUrl, {
          onBeforeLoad(win) {
            // eslint-disable-next-line no-param-reassign
            win.document.cookie =
              "com.auth0.auth.some-random-state=" + JSON.stringify(auth0State);
          },
        });
      });
  });
});
