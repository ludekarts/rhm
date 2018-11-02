import expect from "expect.js"
import createAction from "./index"

describe("Create Action", () => {

  describe("Create basic action", () => {
    const action = createAction("NEW_ACTION")
    const result = action()
    const result_with_params = action({some: "data"})

    const action_with_body = createAction("NEW_ACTION_W_BODY", {})
    const result_with_body = action_with_body({some: "data"})

console.log(result_with_body);
    it("should create redux action creator", () => {
      expect(action).to.be.a("function")
    })

    it("should create redux action with correct \"type\"", () => {
      expect(result).to.only.have.keys("type")
      expect(result.type).to.be.equal("NEW_ACTION")
    })

    it("should not pass \"args\" if action body is not specified", () => {
      expect(result_with_params).to.only.have.keys("type")
      expect(result_with_params.type).to.be.equal("NEW_ACTION")
    })

    it("should pass \"args\" if action body is specified", () => {
      expect(result_with_body).to.only.have.keys("type", "args", "payload")
      expect(result_with_body.type).to.be.equal("NEW_ACTION_W_BODY")
    })
  })

  describe("Create action with payload", () => {

    it("should create an action with \"object\" payload", () => {
      const action = createAction("NEW_ACTION", {data: "value"})
      const result = action()

      expect(result).to.only.have.keys("type", "payload")
      expect(result.payload).to.be.eql({data: "value"})
    })

    it("should create an action with \"function\" payload", () => {
      const action = createAction("NEW_ACTION", id => id)
      const result = action(1)

      expect(result).to.only.have.keys("type", "args", "payload")
      expect(result.payload).to.be.a("number")
      expect(result.payload).to.be.equal(1)
      expect(result.args).to.be.an(Array)
      expect(result.args).to.contain(1)
    })

  })

  describe("Run bypass action", () => {

    it("should forward all creation arguments", () => {
      const actionBodyFn = id => id
      const action = createAction("NEW_ACTION", actionBodyFn)
      const result = action("RHM%BYPASS")

      expect(result).to.only.have.keys("type", "args", "payload")
      expect(result.type).to.be.equal("NEW_ACTION")
      expect(result.payload).to.be.a("function")
      expect(result.payload).to.be.equal(actionBodyFn)
    })

  })

})
