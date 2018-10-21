import expect from "expect.js"
import createAction from "./index"

describe("Create Action", () => {

  describe("Create basic action", () => {
    const action = createAction("NEW_ACTION")
    const result = action()

    it("should create redux action creator", () => {
      expect(action).to.be.a("function")
    })

    it("should create redux action with correct \"type\"", () => {
      expect(result).to.only.have.keys("type")
      expect(result.type).to.be.equal("NEW_ACTION")
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
