/* Copyright 2020 The Rational Index Project Developers. See the LICENSE
file at the top-level directory of this distribution and at
https://github.com/zandaleph/rational-index/blob/main/LICENSE */

import test from 'ava';

import { LIST_HEAD, LIST_TAIL, Positioner } from './positioner';

test('insert10', (t) => {
  const inserter = new Positioner('0123456789');
  t.deepEqual(inserter.insert(LIST_HEAD, LIST_TAIL), ['5']);
  t.deepEqual(inserter.insert(LIST_HEAD, LIST_TAIL, 2), ['3', '7']);
  t.deepEqual(inserter.insert(LIST_HEAD, LIST_TAIL, 3), ['25', '5', '75']);
  t.deepEqual(inserter.insert('5', LIST_TAIL), ['75']);
  t.deepEqual(inserter.insert('1', '8'), ['5']);
  t.deepEqual(inserter.insert('199', '201', 3), ['1995', '2', '2005']);
  t.deepEqual(inserter.insert('12', '129450'), ['125']);
  t.deepEqual(inserter.insert(LIST_HEAD, LIST_TAIL, 99).slice(0, 10), [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '1',
  ]);
  t.deepEqual(inserter.insert('2234', '2241', 789).slice(0, 3), [
    '2234009',
    '2234018',
    '2234026',
  ]);
});

test('insert16', (t) => {
  const inserter = new Positioner('0123456789ABCDEF');
  t.deepEqual(inserter.insert(LIST_HEAD, LIST_TAIL), ['8']);
  t.deepEqual(inserter.insert(LIST_HEAD, LIST_TAIL, 2), ['5', 'B']);
  t.deepEqual(inserter.insert(LIST_HEAD, LIST_TAIL, 4), [
    '33',
    '66',
    '9A',
    'CD',
  ]);
});

test('insert64', (t) => {
  const inserter = new Positioner();
  t.deepEqual(inserter.insert('ABC', 'abc'), ['N']);
  t.deepEqual(inserter.insert('aba', 'abc'), ['abb']);
  t.deepEqual(inserter.insert('aba', 'abd'), ['abbU']);
  t.deepEqual(inserter.insert('a', 'aZ'), ['aH']); // cspell:disable-line
});
