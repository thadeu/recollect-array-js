import RecollectArray from '@/index'

describe('Filter', () => {
  describe('#apply', () => {
    describe('#starts_with', () => {
      describe('ValueObject Pattern', () => {
        it('dnis_cont start without chunks', async () => {
          const conditions = {
            dnis: { starts_with: '5508008870910' },
          }

          const data = Array(10_000)
            .fill(0)
            .map((v, i) => {
              return {
                event_type: 'finish_call',
                event_time: '3',
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

        it('dnis_cont start', () => {
          const conditions = {
            dnis: { starts_with: '550800*' },
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
          expect(filtered.length).toBe(1)
        })
      })

      describe('ValueFunction Pattern', () => {
        it('dnis_cont start', () => {
          const conditions = {
            dnis: { starts_with: () => '550800*' },
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
          expect(filtered.length).toBe(1)
        })
      })

      it('dnis_cont start', () => {
        const conditions = {
          event_time_gte: '3',
          user_id_eq: '513',
          option_selected_eq: '1',
          dnis_starts_with: '550800*',
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
        expect(filtered.length).toBe(1)
      })
    })
  })
})
