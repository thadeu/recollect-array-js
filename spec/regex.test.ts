import RecollectArray from '@/index'

describe('Filter', () => {
  describe('#apply', () => {
    describe('#regex', () => {
      describe('ValueObject Pattern', () => {
        it('dnis_cont start without chunks', async () => {
          const conditions = {
            dnis: { regex: '10$' },
          }

          const data = Array(1)
            .fill(0)
            .map((v, i) => {
              return {
                event_type: 'finish_call',
                event_time: i,
                direction: 'inbound',
                call_status: 'abandoned',
                user_id: '513',
                option_selected: '1',
                dnis: `550800887091${i}`,
              }
            })

          const filtered = RecollectArray.filter(data, conditions)
          expect(filtered.length).toBe(1)
        })
      })

      describe('ValueFunction Pattern', () => {
        it('dnis_cont start', () => {
          const conditions = {
            dnis: { regex: () => '^(?!^550800).*$' }
          }

          const data = [
            {
              event_type: 'finish_call',
              event_time: '3',
              direction: 'inbound',
              call_status: 'abandoned',
              user_id: '513',
              option_selected: '1',
              dnis: '5508008870918',
            },
          ]

          const filtered = RecollectArray.filter(data, conditions)
          expect(filtered.length).toBe(0)
        })
      })

      describe('not_regex', () => {
        it('keeps only the items that do not match', () => {
          const conditions = {
            dnis: { not_regex: '10$' },
          }

          const data = [
            { dnis: '5508008870910' },
            { dnis: '5508008870918' },
          ]

          const filtered = RecollectArray.filter(data, conditions)
          expect(filtered.map((o) => o.dnis)).toEqual(['5508008870918'])
        })

        it('not_reg walks an array of objects', () => {
          const conditions = {
            'post_attendances.digits': { not_reg: '^5$' },
          }

          const data = [
            {
              id: 1,
              post_attendances: [{ digits: '1' }, { digits: '5' }],
            },
            {
              id: 2,
              post_attendances: [{ digits: '9' }],
            },
          ]

          const filtered = RecollectArray.filter(data, conditions)
          expect(filtered.map((o) => o.id)).toEqual([2])
        })
      })
    })
  })
})
