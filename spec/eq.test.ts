import RecollectArray from '@/index'

describe('Filter', () => {
  describe('#apply', () => {
    describe('eq', () => {
      it('default predicate #1', () => {
        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '1',
          },
        ]

        const filtered = RecollectArray.filter(data, { user_id: '513' })
        expect(filtered.length).toBe(1)
      })

      it('default predicate #1', () => {
        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '1',
            active: true,
          },
        ]

        const filtered = RecollectArray.filter(data, { active: true })
        expect(filtered.length).toBe(1)
      })

      it('user_id exists', () => {
        const conditions = {
          user_id_eq: '513',
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '1',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })

      it('user_id empty', () => {
        const conditions = {
          user_id_eq: '',
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            option_selected: '1',
            user_id: '513',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(0)
      })

      it('user_id and direction', () => {
        const conditions = {
          user_id_eq: '513',
          direction: 'outbound',
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '1',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })

      it('user_id NOK', () => {
        const conditions = {
          user_id_eq: '513',
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '30',
            option_selected: '1',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(0)
      })

      it('user_id using iteratee value', () => {
        const conditions = {
          'user.id': { eq: '513' },
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user: { id: '513' },
            option_selected: '1',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })

      it('user_id using iteratee value #2', () => {
        const conditions = {
          'user.id': { eq: '513' },
          'call.status.value': { eq: 'abandoned' },
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call: {
              status: {
                value: 'abandoned',
              },
            },
            user: { id: '513' },
            option_selected: '1',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })

      describe('when field is an array of objects', () => {
        const data = [
          {
            id: 1,
            direction: 'inbound',
            post_attendances: [{ digits: '1' }, { digits: '5' }],
          },
          {
            id: 2,
            direction: 'inbound',
            post_attendances: [{ digits: '5' }],
          },
          {
            id: 3,
            direction: 'outbound',
            post_attendances: [{ digits: '9' }, { digits: '7' }],
          },
          {
            id: 4,
            direction: 'inbound',
            post_attendances: [],
          },
          {
            id: 5,
            direction: 'inbound',
            post_attendances: null,
          },
        ]

        const ids = (collection: any[]) => collection.map((o) => o.id)

        it('eq without index matches when any element has digits = 5', () => {
          const conditions = {
            'post_attendances.digits': { eq: '5' },
          }

          const filtered = RecollectArray.filter(data, conditions)
          expect(ids(filtered)).toEqual([1, 2])
        })

        it('in without index matches when any element has digits in the list', () => {
          const conditions = {
            'post_attendances.digits': { in: ['5'] },
          }

          const filtered = RecollectArray.filter(data, conditions)
          expect(ids(filtered)).toEqual([1, 2])
        })

        it('matches without index matches when any element has digits = 5', () => {
          const conditions = {
            'post_attendances.digits': { matches: '5' },
          }

          const filtered = RecollectArray.filter(data, conditions)
          expect(ids(filtered)).toEqual([1, 2])
        })

        it('cont without index matches when any element contains 5', () => {
          const conditions = {
            'post_attendances.digits': { cont: '*5*' },
          }

          const filtered = RecollectArray.filter(data, conditions)
          expect(ids(filtered)).toEqual([1, 2])
        })

        it('exists without index is false for empty and null arrays', () => {
          const conditions = {
            'post_attendances.digits': { exists: true },
          }

          const filtered = RecollectArray.filter(data, conditions)
          expect(ids(filtered)).toEqual([1, 2, 3])
        })

        it('eq with index matches only that position', () => {
          const conditions = {
            'post_attendances.0.digits': { eq: '5' },
          }

          const filtered = RecollectArray.filter(data, conditions)
          expect(ids(filtered)).toEqual([2])
        })

        it('eq with index reaches the second element', () => {
          const conditions = {
            'post_attendances.1.digits': { eq: '5' },
          }

          const filtered = RecollectArray.filter(data, conditions)
          expect(ids(filtered)).toEqual([1])
        })

        it('eq with index combines with other predicates', () => {
          const conditions = {
            direction_eq: 'inbound',
            'post_attendances.0.digits': { eq: '5' },
          }

          const filtered = RecollectArray.filter(data, conditions)
          expect(ids(filtered)).toEqual([2])
        })

        it('eq with index coerces number to string', () => {
          const numeric = [{ id: 10, post_attendances: [{ digits: 5 }] }]

          const conditions = {
            'post_attendances.0.digits': { eq: '5' },
          }

          const filtered = RecollectArray.filter(numeric, conditions)
          expect(ids(filtered)).toEqual([10])
        })

        it('in works when the field is flattened beforehand', () => {
          const flattened = data.map((item) => ({
            ...item,
            post_attendances_digits: (item.post_attendances ?? []).map((a) => a.digits),
          }))

          const conditions = {
            post_attendances_digits: { in: ['5'] },
          }

          const filtered = RecollectArray.filter(flattened, conditions)
          expect(ids(filtered)).toEqual([1, 2])
        })

        describe('deep traversal', () => {
          it('eq with wildcard matches when any element has digits = 5', () => {
            const conditions = {
              'post_attendances.*.digits': { eq: '5' },
            }

            const filtered = RecollectArray.filter(data, conditions)
            expect(ids(filtered)).toEqual([1, 2])
          })

          it('in matches when any element has digits in the list', () => {
            const conditions = {
              'post_attendances.digits': { in: ['5', '9'] },
            }

            const filtered = RecollectArray.filter(data, conditions)
            expect(ids(filtered)).toEqual([1, 2, 3])
          })

          it('not_eq excludes items where any element has digits = 5', () => {
            const conditions = {
              'post_attendances.digits': { not_eq: '5' },
            }

            const filtered = RecollectArray.filter(data, conditions)
            expect(ids(filtered)).toEqual([3, 4, 5])
          })

          it('combines with predicates on sibling fields', () => {
            const conditions = {
              direction_eq: 'inbound',
              'post_attendances.digits': { eq: '5' },
            }

            const filtered = RecollectArray.filter(data, conditions)
            expect(ids(filtered)).toEqual([1, 2])
          })

          it('empty is true for empty and null arrays', () => {
            const conditions = {
              'post_attendances.digits': { empty: true },
            }

            const filtered = RecollectArray.filter(data, conditions)
            expect(ids(filtered)).toEqual([4, 5])
          })

          it('gt compares every element of the array', () => {
            const conditions = {
              'post_attendances.digits': { gt: 8 },
            }

            const filtered = RecollectArray.filter(data, conditions)
            expect(ids(filtered)).toEqual([3])
          })

          it('regex matches against every element of the array', () => {
            const conditions = {
              'post_attendances.digits': { regex: '^5$' },
            }

            const filtered = RecollectArray.filter(data, conditions)
            expect(ids(filtered)).toEqual([1, 2])
          })

          it('starts_with matches against every element of the array', () => {
            const conditions = {
              'post_attendances.digits': { starts_with: '5' },
            }

            const filtered = RecollectArray.filter(data, conditions)
            expect(ids(filtered)).toEqual([1, 2])
          })

          it('traverses two array levels', () => {
            const nested = [
              { id: 1, calls: [{ post_attendances: [{ digits: '1' }] }, { post_attendances: [{ digits: '5' }] }] },
              { id: 2, calls: [{ post_attendances: [{ digits: '9' }] }] },
            ]

            const conditions = {
              'calls.post_attendances.digits': { eq: '5' },
            }

            const filtered = RecollectArray.filter(nested, conditions)
            expect(ids(filtered)).toEqual([1])
          })

          it('mixes wildcard and explicit index', () => {
            const conditions = {
              'post_attendances.*.digits': { eq: '1' },
              'post_attendances.0.digits': { eq: '1' },
            }

            const filtered = RecollectArray.filter(data, conditions)
            expect(ids(filtered)).toEqual([1])
          })

          it('skips elements missing the key', () => {
            const sparse = [
              { id: 1, post_attendances: [{ other: 'x' }, { digits: '5' }] },
              { id: 2, post_attendances: [{ other: 'x' }] },
            ]

            const conditions = {
              'post_attendances.digits': { eq: '5' },
            }

            const filtered = RecollectArray.filter(sparse, conditions)
            expect(ids(filtered)).toEqual([1])
          })

          it('reads an array of scalars', () => {
            const scalars = [
              { id: 1, tags: ['a', 'b'] },
              { id: 2, tags: ['c'] },
            ]

            const conditions = {
              'tags.*': { eq: 'b' },
            }

            const filtered = RecollectArray.filter(scalars, conditions)
            expect(ids(filtered)).toEqual([1])
          })
        })
      })
    })
  })
})
