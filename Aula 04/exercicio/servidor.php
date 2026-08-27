<?php

$value = $_GET["valor"];

$tipos = [(int) $value, (float) $value, (bool) $value, (string) $value];

$tipoConvertido = $tipos[array_rand($tipos)];

echo "Valor " . $tipoConvertido . " convertido para " . gettype($tipoConvertido);