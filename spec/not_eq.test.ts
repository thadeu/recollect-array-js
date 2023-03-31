import RecollectArray from '@/index'

describe('Filter', () => {
  describe('#apply', () => {
    describe('not_eq', () => {
      it('scene #1', () => {
        const conditions = {
          user_id: { not_eq: '' },
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
    })
  })
})
