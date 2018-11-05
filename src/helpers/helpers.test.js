import expect from "expect.js"
import {isPromise, isPrimitive, isObject, isBypass, uid} from "./index"

describe("Basic helpers tests", () => {

  describe("UID generator", () => {
    it("should geherate new key each time it's called",  () => {
      const key1 = uid();
      const key2 = uid();
      expect(key1).not.to.equal(key2);
    })
  })

  describe("Verify Promise type", () => {

    it("should recognize a Promise", () => {
      const promise = Promise.resolve(true)
      expect(isPromise(promise)).to.be(true)
    })

    it("should fail if not a Promise", () => {
      const number = 12
      expect(isPromise(number)).not.to.be(true)
    })
  })

  describe("Verify 'primitive' types", () => {

    it("should recognize numbers", () => {
      expect(isPrimitive(1)).to.be(true)
    })

    it("should recognize strings", () => {
      expect(isPrimitive("hello")).to.be(true)
    })

    it("should recognize bools", () => {
      expect(isPrimitive(true)).to.be(true)
    })

    it("should recognize symbols", () => {
      expect(isPrimitive(Symbol())).to.be(true)
    })

    it("should recognize arrays", () => {
      expect(isPrimitive([])).to.be(true)
    })

    it("should fail if passed function", () => {
      expect(isPrimitive(() => true)).not.to.be(true)
    })
  })

  describe("Verify object type", () => {
    it("should recognize object", () => {
      expect(isObject({})).to.be(true)
    })

    it("should fail if passed function", () => {
      expect(isObject(() => true)).not.to.be(true)
    })

    it("should fail if passed number", () => {
      expect(isObject(1)).not.to.be(true)
    })
  })

  describe("Verify 'bypass' arguments", () => {
    it("should detect bypass", () => {
      expect(isBypass(["RHM%BYPASS"])).to.be(true)
    })

    it("should fail bypass", () => {
      expect(isBypass(["123"])).not.to.be(true)
      expect(isBypass(1)).not.to.be(true)
    })
  })
})
