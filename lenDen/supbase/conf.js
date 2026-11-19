import { supabase } from './client'

export class TransactionService {
  async getTransactions() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, person:people(*)')
      .order('date', { ascending: false })

    if (error) throw error
    return data
  }

  async getTransactionById(id) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, person:people(*)')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async createTransaction({ type, person_id, new_person_name, amount, note, date }) {
    let finalPersonId = person_id

    if (!finalPersonId) {
      if (!new_person_name?.trim()) throw new Error('Person name is required')

      const { data: person, error: personError } = await supabase
        .from('people')
        .insert({ name: new_person_name.trim() })
        .select()
        .single()

      if (personError) throw personError
      finalPersonId = person.id
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert({
        person_id: finalPersonId,
        type,
        amount,
        note: note?.trim() || null,
        date,
      })
      .select('*, person:people(*)')
      .single()

    if (error) throw error
    return data
  }

  async updateTransaction(id, updates) {
    const { data, error } = await supabase
      .from('transactions')
      .update({
        person_id: updates.person_id,
        type: updates.type,
        amount: updates.amount,
        note: updates.note?.trim() || null,
        date: updates.date,
      })
      .eq('id', id)
      .select('*, person:people(*)')
      .single()

    if (error) throw error
    return data
  }

  async deleteTransaction(id) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

export class PeopleService {
  async getPeople() {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data
  }

  async getPersonById(id) {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async createPerson(name) {
    if (!name?.trim()) throw new Error('Person name is required')

    const { data, error } = await supabase
      .from('people')
      .insert({ name: name.trim() })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async updatePerson(id, name) {
    if (!name?.trim()) throw new Error('Person name is required')

    const { data, error } = await supabase
      .from('people')
      .update({ name: name.trim() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async deletePerson(id) {
    const { error } = await supabase
      .from('people')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

export const transactionService = new TransactionService()
export const peopleService = new PeopleService()
