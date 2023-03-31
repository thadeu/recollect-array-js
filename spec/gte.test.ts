import RecollectArray from '@/index'

describe('Filter', () => {
  describe('#apply', () => {
    describe('#gte', () => {
      it('event_time OK', () => {
        const conditions = {
          event_time_gte: 2,
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '3',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '1',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })

      it('event_time NOK', () => {
        const conditions = {
          event_time_gte: 3,
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: 2,
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '1',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(0)
      })
    })
  })
})
