require 'csv'
require 'pry'

totalCost = 0
numPlayers = 0

CSV.foreach('./datasets/master_updated.csv', headers: true, header_converters: :symbol) do |row|
  totalCost += row[:salary].to_i
  numPlayers+= 1
end

p totalCost
p numPlayers
p (totalCost/numPlayers)