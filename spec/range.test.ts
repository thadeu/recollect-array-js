import RecollectArray from '@/recollect-array'

describe('Filter', () => {
  describe('#apply', () => {
    describe('#range', () => {
      it('event_time', () => {
        const conditions = {
          event_time_range: { start: 1635525542100, end: 1635525542109 },
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

      it('option_selected', () => {
        const conditions = {
          option_selected_range: { start: 1, end: 3 },
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
    })
  })
})
