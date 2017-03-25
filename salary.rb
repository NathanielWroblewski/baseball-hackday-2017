require 'csv'
require 'pry'

totalCost = 0
numPlayers = 0.0
totalWar = 0.00


CSV.foreach('./public/datasets/players.csv', headers: true, header_converters: :symbol) do |row|
  totalCost += row[:salary].to_i
  totalWar += row[:war].to_f
  numPlayers+= 1.0

  # if numPlayers % 100 == 0
  #   p totalCost
  #   p totalWar
  # end
end


print "MLB players = ", numPlayers, "\n"
p "============="
print "total league pay = $", totalCost, "\n"
print "average salary = $", (totalCost/numPlayers).round(0), "\n"
p "============="
print "total league WAR = ", totalWar.round(1), "\n"
print "average WAR = ", (totalWar/numPlayers).round(3), "\n"
p "============="
print "average cost per win = $", (((totalCost/numPlayers).round(0))/(totalWar/numPlayers).round(3)).round(0), "\n"

