import RecollectArray from '@/index'

describe('Filter', () => {
  describe('#apply', () => {
    describe('eq', () => {
      it('default predicate #1', () => {
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

        const filtered = RecollectArray.filter(data, { user_id: '513' })
        expect(filtered.length).toBe(1)
      })

      it('default predicate #1', () => {
        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '1',
            active: true,
          },
        ]

        const filtered = RecollectArray.filter(data, { active: true })
        expect(filtered.length).toBe(1)
      })

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

        const filtered = RecollectArray.filter(data, conditions)
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
            option_selected: '1',
            user_id: '513',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(0)
      })

      it('user_id and direction', () => {
        const conditions = {
          user_id_eq: '513',
          direction: 'outbound',
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

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(0)
      })

      it('user_id using iteratee value', () => {
        const conditions = {
          'user.id': { eq: '513' },
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user: { id: '513' },
            option_selected: '1',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })

      it('user_id using iteratee value #2', () => {
        const conditions = {
          'user.id': { eq: '513' },
          'call.status.value': { eq: 'abandoned' },
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call: {
              status: {
                value: 'abandoned',
              },
            },
            user: { id: '513' },
            option_selected: '1',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })
    })
  })
})
