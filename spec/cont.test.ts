import RecollectArray from '@/recollect-array'

describe('Filter', () => {
  describe('#apply', () => {
    describe('#cont', () => {
      it('dnis_cont start', () => {
        const conditions = {
          event_time_gte: '3',
          user_id_eq: '513',
          option_selected_eq: '1',
          dnis_cont: '550800*',
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

        const filtered = RecollectArray.apply({ conditions, data })
        expect(filtered.length).toBe(1)
      })

      it('dnis_cont end', () => {
        const conditions = {
          event_time_gte: '3',
          user_id_eq: '513',
          option_selected_eq: '1',
          dnis_cont: '*0918',
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

        const filtered = RecollectArray.apply({ conditions, data })
        expect(filtered.length).toBe(1)
      })

      it('dnis_cont includes', () => {
        const conditions = {
          event_time_gte: '3',
          user_id_eq: '513',
          option_selected_eq: '1',
          dnis_cont: '*88709*',
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

        const filtered = RecollectArray.apply({ conditions, data })
        expect(filtered.length).toBe(1)
      })

      it('dnis_cont notfound #1', () => {
        const conditions = {
          event_time_gte: '3',
          user_id_eq: '513',
          option_selected_eq: '1',
          dnis_cont: '88709',
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

        const filtered = RecollectArray.apply({ conditions, data })
        expect(filtered.length).toBe(0)
      })
    })
  })
})
