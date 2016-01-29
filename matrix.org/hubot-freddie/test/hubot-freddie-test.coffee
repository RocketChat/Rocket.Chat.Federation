chai = require 'chai'
sinon = require 'sinon'
chai.use require 'sinon-chai'

expect = chai.expect

describe 'freddie', ->
	beforeEach ->
		process.env['HOMESERVER_URL'] = 'a'
		@robot =
			respond: sinon.spy()
			hear: sinon.spy()

		require('../src/hubot-freddie')(@robot)

	it 'registers a respond listener - list projects', ->
		expect(@robot.respond).to.have.been.calledWith(/projects/i)




