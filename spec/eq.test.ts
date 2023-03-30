import RecollectArray from '@/recollect-array'

describe('Filter', () => {
  describe('#apply', () => {
    describe('eq', () => {
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

        const filtered = RecollectArray.apply({ conditions, data })
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
            user_id: '513',
            option_selected: '1',
          },
        ]

        const filtered = RecollectArray.apply({ conditions, data })
        expect(filtered.length).toBe(1)
      })

      it('user_id and direction', () => {
        const conditions = {
          direction: 'outbound',
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

        const filtered = RecollectArray.apply({ conditions, data })
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

        const filtered = RecollectArray.apply({ conditions, data })
        expect(filtered.length).toBe(0)
      })
    })
  })
})
