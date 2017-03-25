require 'csv'
require 'pry'

players = {}

CSV.foreach('./datasets/salaries.csv', headers: true, header_converters: :symbol) do |row|
  if row[:yearid].to_i == 2016
    id = row[:playerid]
    players[id] = { salary: row[:salary] }
  end
end

CSV.foreach('./datasets/war.csv', headers: true, header_converters: :symbol) do |row|
  if row[:year_id].to_i == 2016
    id = row[:player_id]
    players[id] ||= {}
    players[id][:name] = row[:name_common]
    players[id][:war] = row[:war]
  end
end

CSV.open('./datasets/master.csv', 'w') do |csv|
  csv << %w(name salary war)

  players.each do |player, info|
    csv << [info[:name], info[:salary], info[:war]]
  end
end
