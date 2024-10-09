import RecollectArray from '@/index'

describe('Filter', () => {
  describe('#apply', () => {
    describe('#gt', () => {
      it('event_time OK', () => {
        const conditions = {
          'calls.1.duration': { gt: '1000' },
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '3',
            calls: [
              { duration: '3' },
              { duration: '4' },
            ],
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '1',
          },
          {
            event_type: 'finish_call',
            event_time: '3',
            calls: [
              { duration: '10' },
              { duration: 1001 },
            ],
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
          'calls.0.duration': { gt: 2 },
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '2',
            calls: [
              { duration: 1 },
            ],
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
