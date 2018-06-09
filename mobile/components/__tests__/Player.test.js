// Hero Component tests
import React from 'react'
import { addTypeNameToDocument } from 'apollo-client'
import { MockedProvider } from '../../node_modules/react-apollo/test-utils'
import renderer from 'react-test-renderer'

import PlayerProvider, { TRACKS_QUERY } from '../Player'

describe('PlayerProvider', () => {
	it('delivers props to child component', () => {
		const mockedData = {
			tracks: []
		}

		class DummyComponent extends React.Component {
			componentWillReceiveProps({ loading, tracks }) {
				if (!loading) {
					expect(tracks).toEqual(mockedData.tracks)
					expect(tracks).toMatchSnapshot()
					done()
				} else {
					expect(loading).toBe(true)
				}
			}

			render() {
				return null
			}
		}

		const query = addTypenameToDocument(TRACKS_QUERY)

		const mock = (
			<MockedProvider
				mocks={[
					{
						request: { query, variables },
						result: { data: mockedData }
					}
				]}
			>
				<PlayerProvider>
					<DummyComponent />
				</PlayerProvider>
			</MockedProvider>
		)

		renderer.create(mock)
	})
})
