<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
 
    $token = "1489049966:AAG9LS9F9GbPLvXjba0rDgYaa5LW0XLh5hY";
    $chat_id = "-445256341";

		if (!empty($_POST['name']) && !empty($_POST['phone'])){
		$bot_url = "https://api.telegram.org/bot{$token}/";

				if (isset($_POST['name'])) {
				$name = "Имя: " . strip_tags($_POST['name']) . "%0A";
				}

				if (isset($_POST['phone'])) {
				$phone = "Телефон: " . strip_tags($_POST['phone']) . "%0A";
				}

				if (isset($_POST['utm_source'])) {
				$utmSource = "utm source: " . strip_tags($_POST['utm_source']) . "%0A";
				}

				if (isset($_POST['utm_medium'])) {
				$utmMedium = "utm medium: " . strip_tags($_POST['utm_medium']) . "%0A";
				}

				if (isset($_POST['utm_campaign'])) {
				$utmCampaign = "utm campaign: " . strip_tags($_POST['utm_campaign']) . "%0A";
				}

				if (isset($_POST['utm_content'])) {
				$utmContent = "utm content: " . strip_tags($_POST['utm_content']) . "%0A";
				}

				if (isset($_POST['utm_term'])) {
				$utmTerm = "utm term: " . strip_tags($_POST['utm_term']) . "%0A";
				}

				if (isset($_POST['source'])) {
				$source = "Источник заявки: " . strip_tags($_POST['source']) . "%0A";
				}
				

        // Формируем текст сообщения
        $txt = $name . $phone . $utmSource . $utmMedium . $utmCampaign . $utmContent . $utmTerm . $source;
 
        $sendTextToTelegram = file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}");
        if ($sendTextToTelegram) {
					header ("Location: /thanks.html");
				} else {
            die('Ошибка. Сообщение не отправлено!');
				};

			};
		};
?>