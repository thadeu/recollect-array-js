import RecollectArray from '@/index'

describe('Filter', () => {
  describe('#apply', () => {
    describe('#truthy', () => {
      describe('ValueObject Pattern', () => {
        it('dnis_cont start without chunks', async () => {
          const conditions = {
            option_selected: { empty: false },
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
                option_selected: 0,
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
    })
  })
})
