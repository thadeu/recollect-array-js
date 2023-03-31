import RecollectArray from '@/index'

describe('Filter', () => {
  describe('#apply', () => {
    describe('#range', () => {
      it('event_time', () => {
        const conditions = {
          event_time: { gte: 1635525532100, lte: 1635525542109 },
          option_selected: { gt: 1, lt: 3 },
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525532100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '1',
          },
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '2',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })

      it('option_selected', () => {
        const optionSelectedGte = () => 1
        const optionSelectedLte = () => 2

        const optionSelected = {
          gte: optionSelectedGte,
          lte: optionSelectedLte,
        }

        const conditions = {
          option_selected: optionSelected,
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
