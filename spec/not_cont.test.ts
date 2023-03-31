import RecollectArray from '@/index'

describe('Filter', () => {
  describe('#apply', () => {
    describe('#not_cont', () => {
      describe('ValueObject Pattern', () => {
        it('dnis_cont start', () => {
          const conditions = {
            dnis: { not_cont: '550800*' },
          }

          const data = [
            {
              event_type: 'finish_call',
              event_time: '3',
              direction: 'inbound',
              call_status: 'abandoned',
              user_id: '513',
              option_selected: '1',
              dnis: '5508018870918',
            },
          ]

          const filtered = RecollectArray.filter(data, conditions)
          expect(filtered.length).toBe(1)
        })
      })
    })
  })
})
