export function formatCellChessNotation(cell) {
  const row = "abcdefhg"[Math.floor(cell.id/8)]
  const column = (cell.id % 8) + 1

  let piece = ''

  if(cell.piece == 'white-rock' || cell.piece == 'black-rock') piece = 'R'
  if(cell.piece == 'white-bishop' || cell.piece == 'black-bishop') piece = 'B'
  if(cell.piece == 'white-knight' || cell.piece == 'black-knight') piece = 'Kn'
  if(cell.piece == 'white-quine' || cell.piece == 'black-quine') piece = 'Q'
  if(cell.piece == 'white-king' || cell.piece == 'black-king') piece = 'K'

  return `${piece}${row}${column}`
}

export default function formatMoveChessNotation(cellFrom, cellTo, currentMove) {
  const fromNotation = formatCellChessNotation(cellFrom)
  const toNotation = formatCellChessNotation(cellTo)

  let separator = ' - '
  if(cellFrom.piece && cellTo.piece)
    separator = ' x '

  return `${currentMove + 1}:${fromNotation}${separator}${toNotation};`
}
